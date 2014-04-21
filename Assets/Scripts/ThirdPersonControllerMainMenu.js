
// Require a character controller to be attached to the same game object
@script RequireComponent(CharacterController)

public class ThirdPersonControllerMainMenu extends Photon.MonoBehaviour{

public var idleAnimation : AnimationClip;

private var _animation : Animation;

public var dinosaurType : DinosaurEnum;

private var mouseOver : boolean = false;

public var hoverString : String;

var style : GUIStyle;

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

function OnGUI () {

    if(mouseOver)
    {
        GUILayout.BeginArea (Rect((Screen.width/2)-150, (Screen.height-40), 320, 40));
        GUILayout.Label(hoverString, style);
        GUILayout.EndArea ();
    }
}

function OnMouseOver () {
    mouseOver = true;
}

function OnMouseExit () {
    mouseOver = false;
}

function Update() {

    _animation.CrossFade("idle");
}

}
