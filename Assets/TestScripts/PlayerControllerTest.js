
// Require a character controller to be attached to the same game object
//@script RequireComponent(CharacterController)
public var spawnScript : SpawnscriptTest;

public var movementActive : boolean = false;

public var movementLock : boolean = false;

public var spawnNumber : int;

public var grabbedFruit : boolean = false;

private var _animation : Animation;

private var lead: Transform;

private var offset;

public var firstDino : boolean = false;

public var tutorialGui : TutorialGUI;

/*
enum CharacterState {
	Idle = 0,
	Walking = 1,
	Attacking = 2,
}

enum TextureType {
    Grass = 0,
    Sand = 1,
    Blueberry = 2,
    Redberry = 3,
    Orangeberry = 4,
}
*/

//private var _characterState : CharacterState;

// The speed when walking
var walkSpeed = 2.0;
var rotateSpeed = 500.0;



// The current move direction in x-z
private var moveDirection = Vector3.zero;

// The last collision flags returned from controller.Move
private var collisionFlags : CollisionFlags; 


// the height we jumped from (Used to determine for how long to apply extra jump power after jumping.)
private var lastJumpStartHeight = 0.0;

public var speedSound : AudioClip;

private var inAirVelocity = Vector3.zero;

private var healthCounter : int;

public var playerID : int;

private var isControllable = true;

var health_ : HealthStatus;

private var healthMax_ : int = 9;

var collisionCounter : int = 0;

var HealthPlane : GameObject;

private var normalSpeed : int = 80;

private var speedTime : float = 3;  // 3 seconds

private var speedTimeCheck : float;

public var speedActive : boolean = false;

public var speedAvailable : boolean = true;

private var speedCooldown : boolean = false;

private var speedCooldownTimeCheck : float;

private var speedCooldownTime : float = 3;   // 3 seconds

public var fruitBombs : int = 0;

public var pickedUpFruit : boolean = false;

public var yellowCube : GameObject;
/*
enum HealthStatus {
    Green = 3, 
    Yellow = 2,
    Red = 1,
    Dead = 0,
}
*/
function Start ()
{
   health_ = HealthStatus.Green;
   var t : Transform;
   for (t in transform.GetComponentsInChildren.<Transform>()) {
       if (t.name == "HealthPlane"){ HealthPlane = t.gameObject;}
   }
   HealthPlane.renderer.enabled = false;
   
   if(firstDino)HealthPlane.renderer.material.color = Color.red;
   
   
   spawnScript = GameObject.Find("Spawnscript").GetComponent.<SpawnscriptTest>();
   
   tutorialGui = GameObject.Find("GUI").GetComponent.<TutorialGUI>();


   if(!firstDino)lead = spawnScript.player1prefabs[0].transform;
   else lead = transform;

}

function Awake ()
{

    
	moveDirection = transform.TransformDirection(Vector3.forward);
	
	_animation = GetComponent(Animation);
	if(!_animation)
		Debug.Log("The character you would like to control doesn't have animations. Moving her might look weird.");
	
}



function Update() {

    var checkTerrain : TextureType;
    

        walkSpeed = 80;
        healthMax_ = 6;
        
        if(pickedUpFruit)
        {
            if (Input.GetMouseButtonDown(0))
            {
                Instantiate(yellowCube, transform.position, transform.rotation);
                --fruitBombs;
                if(fruitBombs == 0)
                {
                    pickedUpFruit = false;
                }
            }
        }
        
        if(speedAvailable)
        {
            if (Input.GetMouseButtonDown(1)  && !speedActive)
            {
               speedActive = true;
               audio.PlayOneShot(speedSound);
               speedTimeCheck = Time.time + speedTime;   // set timer for 3 seconds
               speedAvailable = false;
            }
        }
        
        if(speedActive)
        {
            walkSpeed = 160;
            healthMax_ = 15;
            if(Time.time >= speedTimeCheck)  // 3 seconds of speed has expired
            {
                speedActive = false;
                speedCooldown = true;
                speedCooldownTimeCheck = Time.time + speedCooldownTime;
            }
        }
        
        if(speedCooldown)
        {
            if(Time.time >= speedCooldownTimeCheck)  // 3 seconds of cooldown has expired
            {
                speedAvailable = true;
                speedCooldown = false;
            }
        }
        
	    if (!isControllable)
	    {
		    // kill all inputs if not controllable.
		    Input.ResetInputAxes();
	    }
        checkTerrain = GetTerrainTextureAt(transform.position);
        
        Debug.Log(checkTerrain);
    /*     if(grabbedFruit)
        {
            walkSpeed = 160;
        }      
        else
        {*/
            //walkSpeed = 80;
        //}
        if(checkTerrain == TextureType.Sand)
        {
            walkSpeed = 40;
            
            //tutorialGui.OverSand();
        }
        
        // actually lava
        if(checkTerrain == TextureType.Blueberry)
        {
            Debug.Log("on lava");
            DecreaseHealth();
        }
             
        //if(Input.GetMouseButtonDown(1))
        //{
        //    movementActive = !movementActive;
       // }
    	if(Input.GetMouseButtonDown(2)){
    		movementLock = !movementLock;
    		offset = lead.position - transform.position;	
    	}
       if (movementActive == true)
       {
       		if(movementLock){
       			if(spawnNumber==1){
       				ProcessMovement();
       			}else{
       				FollowMovement();
       			}	
       		}
       		else{
       			ProcessMovement();
       		}
       }
       else
       {
            _animation.CrossFade("idle");
       }
        
    
	
}

function RestoreHealth()
{
    healthCounter++;
    Debug.Log(health_);
    if(firstDino) {tutorialGui.OverBerries();}
    
    if(health_ < HealthStatus.Green)
    {
        Debug.Log(health_);
        health_ = HealthStatus.Green;
        healthCounter = 0;
        HealthPlane.renderer.material.color = Color.green;
    }
    
}

function GetMovementActive()
{
    return movementActive;
}

function ProcessMovement()
{
    // Generate a plane that intersects the transform's position with an upwards normal.
    var playerPlane = new Plane(Vector3.up, transform.position);
 
    // Generate a ray from the cursor position
    var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
 
    // Determine the point where the cursor ray intersects the plane.
    // This will be the point that the object must look towards to be looking at the mouse.
    // Raycasting to a Plane object only gives us a distance, so we'll have to take the distance,
    //   then find the point along that ray that meets that distance.  This will be the point
    //   to look at.
    var hitdist = 0.0;
    // If the ray is parallel to the plane, Raycast will return false.
    if (playerPlane.Raycast (ray, hitdist)) 
    {
        // Get the point along the ray that hits the calculated distance.
        switch (health_)
                {
                    case HealthStatus.Green:
                        transform.position.y = 12;
                        break;
                    case HealthStatus.Yellow:
                        transform.position.y = 5;
                        break;
                    case HealthStatus.Red:
                        transform.position.y = -1;
                        break;
                }
        
        
        
        var targetPoint = ray.GetPoint(hitdist);
                
        var multiplierToMouse : int;
        
        multiplierToMouse = spawnNumber;
        if(spawnNumber > 4)
        {
            multiplierToMouse = 4;
        }
        
        if(Vector3.Distance(targetPoint, transform.position) < 25 * multiplierToMouse)
        {
            _animation.CrossFade("idle");
            
            
        }
        else
        {
            // Determine the target rotation.  This is the rotation if the transform looks at the target point.
            var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
 
            // Smoothly rotate towards the target point.
            transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, walkSpeed * Time.deltaTime);
 
            // Move the object forward.
            transform.position += transform.forward * walkSpeed * Time.deltaTime;
           switch (health_)
                {
                    case HealthStatus.Green:
                        transform.position.y = 12;
                        break;
                    case HealthStatus.Yellow:
                        transform.position.y = 5;
                        break;
                    case HealthStatus.Red:
                        transform.position.y = -1;
                        break;
                }   
                    
            _animation.CrossFade("walk");
        }
        
 
    }
}

function FollowMovement(){
	transform.position = lead.position - offset;
	transform.rotation = lead.rotation;
	_animation.CrossFade("walk");
}

function FixedUpdate() 
{
    
    
}

function OnTriggerEnter(collisionInfo : Collider){
    if(collisionInfo.name != this.name){
        if((collisionInfo.tag == "Red" && this.tag == "Blue") || (collisionInfo.tag == "Blue" && this.tag == "Red")){
           if(collisionCounter % healthMax_ == 0)
            {
                DecreaseHealth();
                tutorialGui.HitEnemy();
                _animation.CrossFade("Attack");
            }
            collisionCounter++;
        }
    }

 	if(collisionInfo.tag == "Fruit")
    {
        spawnScript.PickedUpFruit();
        //tutorialGui.PickedUpOrange();
        grabbedFruit = true;
        //transform.localScale *= 2;
        //healthMax_ *= 2;
        Debug.Log(healthMax_);
    }
    
    if(collisionInfo.tag == "Cave")
    {
    Debug.Log("base");
        tutorialGui.HitBase();
    }
    
    if(collisionInfo.tag == "BlueBase")
    {
        Application.LoadLevel("MainMenu");
    }
}

function OnTriggerExit (collisionInfo : Collider) {
   //collisionCounter--;
   //Debug.Log(collisionCounter);
}

function DecreaseHealth()
{
    //Debug.Log(health_);
    switch (health_)
    {
        case HealthStatus.Green:
            health_ = HealthStatus.Yellow;
            transform.localScale /= 1.3;
            break;
        case HealthStatus.Yellow:
            health_ = HealthStatus.Red;
            transform.localScale /= 1.3;
            break;
        case HealthStatus.Red:
            health_ = HealthStatus.Dead;
            Destroy(this.gameObject);
            spawnScript.UnitDied(spawnNumber);
            break;
    }
}

function OnControllerColliderHit (hit : ControllerColliderHit )
{
//  Debug.DrawRay(hit.point, hit.normal);
    if (hit.moveDirection.y > 0.01) 
        return;
}

function GetTerrainTextureAt(position : Vector3)
{
       // Set up:
       var retval : int;
       var TS : Vector3; // terrain size
       var AS : Vector2; // control texture size
 
       TS = Terrain.activeTerrain.terrainData.size;
       AS.x = Terrain.activeTerrain.terrainData.alphamapWidth;
       AS.y = Terrain.activeTerrain.terrainData.alphamapHeight;
 
 
       // Lookup texture we are standing on:
       var AX : int;
       AX =  (position.x/TS.x )*AS.x + 0.5f ;
       var AY : int;
       AY =  (position.z/TS.z )*AS.y + 0.5f;
       var TerrCntrl : float[,,] = Terrain.activeTerrain.terrainData.GetAlphamaps(AX, AY,1 ,1);
 
       var TD : TerrainData = Terrain.activeTerrain.terrainData;
 
       var i : int;
       for(i = 0; i < TD.splatPrototypes.Length; i++ )
       {
         if( TerrCntrl[0,0,i] > .5f )
         {
           retval = i;
         }
 
       }
       return retval;
}
    
function GetSpeed () {
	return walkSpeed;
}  

function GetDirection () {
	return moveDirection;
}

function Reset ()
{
	gameObject.tag = "Player";
}

