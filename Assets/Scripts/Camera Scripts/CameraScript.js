﻿#pragma strict

var cameraTransform : Transform;


function Update () {
    
    Debug.Log(cameraTransform.position);
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
<<<<<<< HEAD
    if(Input.GetKey(KeyCode.Z)){
        if(cameraTransform.position.y > 300)
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
=======
>>>>>>> 1db9ae1197ee78312523ec4423ebd7c0d5def39a
}