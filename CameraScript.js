#pragma strict

var cameraTransform : Transform;


function Update () {
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
		cameraTransform.position.y += 5;
	}
	else if(Input.GetKey(KeyCode.X)){
		cameraTransform.position.y -= 5;
	}
}
