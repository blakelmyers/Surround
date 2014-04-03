
// Require a character controller to be attached to the same game object
//@script RequireComponent(CharacterController)
public var spawnScript : Spawnscript;

public class PlayerController extends Photon.MonoBehaviour{

public var movementActive : boolean = false;

public var movementLock : boolean = false;

public var spawnNumber : int;

public var grabbedFruit : boolean = false;

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

var HealthPlane : GameObject;


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
       if (t.name == "HealthPlane"){ HealthPlane = t.gameObject;}
   }
   HealthPlane.renderer.material.color = Color.green;
   
   
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
        Debug.Log(this.tag);
	    if (!isControllable)
	    {
		    // kill all inputs if not controllable.
		    Input.ResetInputAxes();
	    }
        checkTerrain = GetTerrainTextureAt(transform.position);
        
        walkSpeed = 80;
        
          
        if(checkTerrain == TextureType.Blueberry && this.tag == "Blue")
        {
            RestoreHealth();     
        }
        if(checkTerrain == TextureType.Redberry  && this.tag == "Red")
        {
            RestoreHealth();     
        }    
        
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
        HealthPlane.renderer.material.color = Color.green;
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
            if(grabbedFruit)
            {
                transform.position.y = 7;
            }
            else
            {
                transform.position.y = 1;
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
            if(grabbedFruit)
            {
                transform.position.y = 7;
            }
            else
            {
                transform.position.y = 1;
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
        if((collisionInfo.tag == "Red" && this.tag == "Blue") || (collisionInfo.tag == "Blue" && this.tag == "Red")){
           if(collisionCounter % 6 == 0)
            {
                DecreaseHealth();
                _animation.CrossFade("Attack");
            }
            collisionCounter++;
        }
    }

    }
    
    if(collisionInfo.tag == "Fruit")
    {
        if(!grabbedFruit)transform.localScale *= 2;
        grabbedFruit = true;
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
    //Debug.Log(health_);
    switch (health_)
    {
        case HealthStatus.Green:
            health_ = HealthStatus.Yellow;
            HealthPlane.renderer.material.color = Color.yellow;
            break;
        case HealthStatus.Yellow:
            health_ = HealthStatus.Red;
            HealthPlane.renderer.material.color = Color.red;
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
	gameObject.tag = "Player";
}

}