
// Require a character controller to be attached to the same game object
//@script RequireComponent(CharacterController)

public var movementActive : boolean = false;

public var spawnNumber : int;

private var _animation : Animation;

var playerType : PlayerType;

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

public var spawnScript : Spawnscript;

// The current move direction in x-z
private var moveDirection = Vector3.zero;

// The last collision flags returned from controller.Move
private var collisionFlags : CollisionFlags; 


// the height we jumped from (Used to determine for how long to apply extra jump power after jumping.)
private var lastJumpStartHeight = 0.0;


private var inAirVelocity = Vector3.zero;

private var healthCounter : int;


private var isControllable = true;

var health_ : HealthStatus;
var collisionCounter : int = 0;
var RedPlane : GameObject;
var GreenPlane : GameObject;
var YellowPlane : GameObject;

enum HealthStatus {
    Green = 3, 
    Yellow = 2,
    Red = 1,
    Dead = 0,
}

function Start ()
{
   health_ = HealthStatus.Green;
   var t : Transform;
   for (t in transform.GetComponentsInChildren.<Transform>()) {
        if (t.name == "RedPlane"){ RedPlane = t.gameObject;}
        else if (t.name == "GreenPlane"){ GreenPlane = t.gameObject;}
        else if (t.name == "YellowPlane"){ YellowPlane = t.gameObject;}
   }
   GreenPlane.renderer.enabled = true;
   RedPlane.renderer.enabled = false;
   YellowPlane.renderer.enabled = false;
   
   spawnScript = GameObject.Find("Spawnscript").GetComponent.<Spawnscript>();
}

function Awake ()
{
    if(!networkView.isMine){
		//We aren't the network owner, disable this script
		//RPC's and OnSerializeNetworkView will STILL get trough!
		enabled=false;	
	}
	
	moveDirection = transform.TransformDirection(Vector3.forward);
	
	_animation = GetComponent(Animation);
	if(!_animation)
		Debug.Log("The character you would like to control doesn't have animations. Moving her might look weird.");
	
}

function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo)
{
	if (stream.isWriting){
		//Executed on the owner of the networkview; 
		//The server sends it's position over the network
		
		var pos : Vector3 = transform.position;		
		stream.Serialize(pos);//"Encode" it, and send it
				
	}else{
		//Executed on the others; 
		//The clients receive a position and set the object to it
		
		var posReceive : Vector3 = Vector3.zero;
		stream.Serialize(posReceive); //"Decode" it and receive it
		transform.position = posReceive;
		
	}
}

@RPC
function SetPosition(newPos : Vector3){
	//This RPC is in this case always called by the server,
	// but executed on all clients
	
	transform.position=newPos;	
}


function Update() {

    var checkTerrain : TextureType;
    
    if(networkView.isMine)
    {
	    if (!isControllable)
	    {
		    // kill all inputs if not controllable.
		    Input.ResetInputAxes();
	    }
        checkTerrain = GetTerrainTextureAt(transform.position);
        if(checkTerrain == TextureType.Sand)
        {
            walkSpeed = 40;
        }
        else if(checkTerrain == TextureType.Blueberry  && playerType == PlayerType.Client)
        {
            RestoreHealth();     
        }
        else if(checkTerrain == TextureType.Redberry  && playerType == PlayerType.Server)
        {
            RestoreHealth();     
        }
        else
        {
            walkSpeed = 80;
        }
              
        if(Input.GetMouseButtonDown(1))
        {
            movementActive = !movementActive;
        }
    
       if (movementActive == true)
       {
            ProcessMovement();
       }
       else
       {
            _animation.CrossFade("idle");
       }
        
    }
	
}

function RestoreHealth()
{
    healthCounter++;
    
    if(health_ < HealthStatus.Green)
    {
        Debug.Log(health_);
        health_ = HealthStatus.Green;
        healthCounter = 0;
        GreenPlane.renderer.enabled = true;
        RedPlane.renderer.enabled = false;
        YellowPlane.renderer.enabled = false;
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
             
        var targetPoint = ray.GetPoint(hitdist);
                
        // Don't move is mouse is with 5 units
        if(Vector3.Distance(targetPoint, transform.position) < 20 * spawnNumber)
        {
            _animation.CrossFade("idle");
            transform.position.y = 1;
            
        }
        else
        {
            // Determine the target rotation.  This is the rotation if the transform looks at the target point.
            var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
 
            // Smoothly rotate towards the target point.
            transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, walkSpeed * Time.deltaTime);
 
            // Move the object forward.
            transform.position += transform.forward * walkSpeed * Time.deltaTime;
            transform.position.y = 1;        
            _animation.CrossFade("walk");
        }
        
 
    }
}

function FixedUpdate() 
{
    
    
}

function OnTriggerEnter(collisionInfo : Collider){
    if(collisionInfo.name != this.name){
        if((collisionInfo.tag == "Red" && this.tag == "Blue") || (collisionInfo.tag == "Blue" && this.tag == "Red")){
           if(collisionCounter % 6 == 0)
            {
                DecreaseHealth();
            }
            collisionCounter++;
        }
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
            GreenPlane.renderer.enabled = false;
            RedPlane.renderer.enabled = false;
            YellowPlane.renderer.enabled = true;
            break;
        case HealthStatus.Yellow:
            health_ = HealthStatus.Red;
            GreenPlane.renderer.enabled = false;
            RedPlane.renderer.enabled = true;
            YellowPlane.renderer.enabled = false;
            break;
        case HealthStatus.Red:
            health_ = HealthStatus.Dead;
            Network.Destroy(this.gameObject);
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

