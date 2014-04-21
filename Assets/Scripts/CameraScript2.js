#pragma strict

public class CameraScript2  extends Photon.MonoBehaviour{

var cameraTransform : Transform;

public var Boundary : int = 50; // distance from edge scrolling starts
public var speed : int = 3;

private var theScreenWidth : int;
private var theScreenHeight : int;

private var playerID : int;
function Start() 
{
   theScreenWidth = Screen.width;
   theScreenHeight = Screen.height;
   
   playerID = PhotonNetwork.player.ID;
}

function Update() 
{
   /*
   if (Input.mousePosition.x > theScreenWidth - Boundary)
   {
      cameraTransform.position.x -= speed; // move on +X axis
   }

   if (Input.mousePosition.x < 0 + Boundary)
   {
      cameraTransform.position.x += speed; // move on -X axis
   }

   if (Input.mousePosition.y > theScreenHeight - Boundary)
   {
      cameraTransform.position.z -= speed; // move on +Z axis
   }

   if (Input.mousePosition.y < 0 + Boundary)
   {
      cameraTransform.position.z += speed; // move on -Z axis
   }*/
    //Debug.Log(cameraTransform.position);
    if(Input.GetKey(KeyCode.A)){
		cameraTransform.position.x += 5;
	}
	else if(Input.GetKey(KeyCode.D)){
		cameraTransform.position.x -= 5;
	}
	if(Input.GetKey(KeyCode.W)){
		cameraTransform.position.z -= 5;
	}	
	else if(Input.GetKey(KeyCode.S)){
		cameraTransform.position.z += 5;
	}
    if(Input.GetKey(KeyCode.Z)){
        if(cameraTransform.position.y > 200)
        {
            cameraTransform.position.y -= 5;
        }
    }   
    else if(Input.GetKey(KeyCode.X)){
        if(cameraTransform.position.y < 600)
        {
            cameraTransform.position.y += 5;
        }
    }
    

}

function OnPhotonSerializeView(stream : PhotonStream, info : PhotonMessageInfo)
{
}

}