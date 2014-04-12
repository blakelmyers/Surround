
// Require a character controller to be attached to the same game object
//@script RequireComponent(CharacterController)
public var spawnScript : Spawnscript;

public class PlayerController extends Photon.MonoBehaviour{

public var movementActive : boolean = false;

public var movementLock : boolean = false;

public var spawnNumber : int;

public var fruitBombs : int = 0;

public var pickedUpFruit : boolean = false;

private var _animation : Animation;

private var lead: Transform;

private var offset;


/*
enum CharacterState {
	Idle = 0,
	Walking = 1,
	Attacking = 2,
}
*/
enum TextureType {
    Grass = 0,
    Sand = 1,
    Blueberry = 2,
    Redberry = 3,
    Orangeberry = 4,
}

//private var _characterState : CharacterState;

// The speed when walking
var walkSpeed = 2.0;
var rotateSpeed = 500.0;



// The current move direction in x-z
private var moveDirection = Vector3.zero;

// The last collision flags returned from controller.Move
private var collisionFlags : CollisionFlags; 

var PV: PhotonView;

// the height we jumped from (Used to determine for how long to apply extra jump power after jumping.)
private var lastJumpStartHeight = 0.0;


private var inAirVelocity = Vector3.zero;

private var healthCounter : int;

public var playerID : int;

private var isControllable = true;

var health_ : HealthStatus;
var collisionCounter : int = 0;

var collisionCounter2 : int = 0;

private var healthMax_ : int = 6;

private var normalSpeed : int = 80;

private var speedTime : float = 3;  // 3 seconds

private var speedTimeCheck : float;

public var speedActive : boolean = false;

public var speedAvailable : boolean = true;

private var speedCooldown : boolean = false;

private var speedCooldownTimeCheck : float;

private var speedCooldownTime : float = 5;   // 3 seconds

enum HealthStatus {
    Green = 3, 
    Yellow = 2,
    Red = 1,
    Dead = 0,
}

function Start ()
{

    PV = gameObject.GetComponent(PhotonView);
    
    if(!PV.isMine){
        //We aren't the network owner, disable this script
        //RPC's and OnSerializeNetworkView will STILL get trough!
        enabled=false;  
    }
    else{
   health_ = HealthStatus.Green;

   var t : Transform;
   for (t in transform.GetComponentsInChildren.<Transform>()) {
       if (t.name == "Plane"){ planeObj = t.gameObject;}
   }
   
   planeObj.renderer.enabled = false;
   
   spawnScript = GameObject.Find("Spawnscript").GetComponent.<Spawnscript>();
   Debug.Log("game started");
   Debug.Log(spawnScript.GetGameStarted());
   if(spawnScript.GetGameStarted() == false)
   {
      Debug.Log("startspawning");
      spawnScript.StartSpawning();
   } 
   if(playerID == 1){
		lead = spawnScript.player1prefabs[0].transform;
	}
	if(playerID == 2){
		lead = spawnScript.player2prefabs[0].transform;
	}
    }
}

function Awake ()
{
    
	playerID = PhotonNetwork.player.ID;
    
	moveDirection = transform.TransformDirection(Vector3.forward);
	
	_animation = GetComponent(Animation);
	if(!_animation)
		Debug.Log("The character you would like to control doesn't have animations. Moving her might look weird.");
	
     Debug.Log(playerID);
}



function Update() {

    var checkTerrain : TextureType;
    
    if(PV.isMine)
    {
        walkSpeed = 80;
        healthMax_ = 6;
        
        if(pickedUpFruit)
        {
            if (Input.GetKey (KeyCode.F))
            {
                PhotonNetwork.Instantiate(this.tag + "Poop", transform.position, transform.rotation, 0);
                --fruitBombs;
                if(fruitBombs == 0)
                {
                    pickedUpFruit = false;
                }
            }
        }
        
        if(speedAvailable)
        {
            if (Input.GetKey (KeyCode.Space)  && !speedActive)
            {
               speedActive = true;
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
        
        
        if(Input.GetMouseButtonDown(1))
        {
            movementActive = !movementActive;
        }
    	if(Input.GetMouseButtonDown(0)){
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
	
}

function RestoreHealth()
{
if(PV.isMine)
    {
    healthCounter++;
    
    if(health_ < HealthStatus.Green)
    {
        Debug.Log(health_);
        health_ = HealthStatus.Green;
        healthCounter = 0;
    }
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
        if(GetTerrainTextureAt(transform.position) == TextureType.Sand)
        {
            walkSpeed = 40;
            transform.position.y = -2;
        }    
        else{

                //set y lock based on size
                switch (health_)
                {
                    case HealthStatus.Green:
                        transform.position.y = 7;
                        break;
                    case HealthStatus.Yellow:
                        transform.position.y = 1;
                        break;
                    case HealthStatus.Red:
                        transform.position.y = -1;
                        break;
                }
                
            
        	
        }
        var targetPoint = ray.GetPoint(hitdist);
                
        // Don't move if mouse is with 5 units
        if(Vector3.Distance(targetPoint, transform.position) < 20 * spawnNumber)
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

                //set y lock based on size
                switch (health_)
                {
                    case HealthStatus.Green:
                        transform.position.y = 7;
                        break;
                    case HealthStatus.Yellow:
                        transform.position.y = 1;
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
if(PV.isMine)
    {
    if(collisionInfo.name != this.name){
        // Only take damage from other color dinosaur (player 2)
        if((collisionInfo.tag == "Red") || (collisionInfo.tag == "Blue") || (collisionInfo.tag == "Green") || (collisionInfo.tag == "Yellow") || (collisionInfo.tag == "Purple") || (collisionInfo.tag == "Orange")){
           if(collisionCounter % healthMax_ == 0)
            {
                DecreaseHealth();
                _animation.CrossFade("Attack");
            }
            collisionCounter++;
        }
    }

    if(collisionInfo.tag != (this.tag + "Poop")){
        if((collisionInfo.tag == "RedPoop") || (collisionInfo.tag == "BluePoop") || (collisionInfo.tag == "GreenPoop") || (collisionInfo.tag == "YellowPoop") || (collisionInfo.tag == "PurplePoop") || (collisionInfo.tag == "OrangePoop")){
            if(collisionCounter2 % 3 == 0)
            {
             DecreaseHealth();
             }
             collisionCounter2++;
        }
    }
    
    if(collisionInfo.tag == "Fruit")
    {
        //pickedUpFruit = true;
        if(spawnScript != 0)
        spawnScript.PickedUpFruit();
        //++fruitBombs;
        Debug.Log(fruitBombs);
    }
    }
}

function OnTriggerExit (collisionInfo : Collider) {
   //collisionCounter--;
   //Debug.Log(collisionCounter);
}

function DecreaseHealth()
{
if(PV.isMine)
    {
    Debug.Log("decrease size");
    Debug.Log(health_);
    switch (health_)
    {
        case HealthStatus.Green:
            health_ = HealthStatus.Yellow;
            transform.localScale /= 1.3;
            break;
        case HealthStatus.Yellow:
            health_ = HealthStatus.Red;
            transform.localScale /= 1.2;
            break;
        case HealthStatus.Red:
            health_ = HealthStatus.Dead;
            PhotonNetwork.Destroy(this.gameObject);
            spawnScript.UnitDied(spawnNumber);
            break;
    }
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
}

}