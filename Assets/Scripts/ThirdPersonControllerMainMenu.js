
// Require a character controller to be attached to the same game object
@script RequireComponent(CharacterController)

public class ThirdPersonControllerMainMenu extends Photon.MonoBehaviour{

public var idleAnimation : AnimationClip;

private var _animation : Animation;

public var dinosaurType : DinosaurEnum;


function Awake ()
{	
    _animation = GetComponent(Animation);		
}


function OnMouseDown()
{
    Debug.Log(dinosaurType);
    
    GameObject.Find("Selection").GetComponent(SelectionChoice).selectionValue = dinosaurType;
    Application.LoadLevel("MapScene");
}

function Update() {

    _animation.CrossFade("idle");
}

}
