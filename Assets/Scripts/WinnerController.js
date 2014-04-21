
// Require a character controller to be attached to the same game object
@script RequireComponent(CharacterController)

public var idleAnimation : AnimationClip;

public var attackAnimation : AnimationClip;

private var _animation : Animation;

public var dinosaurType : DinosaurEnum;

private var mouseOver : boolean = false;

public var hoverString : String;

var style : GUIStyle;

function Awake ()
{	
    _animation = GetComponent(Animation);		
}




function OnMouseOver () {
    mouseOver = true;
}

function OnMouseExit () {
    mouseOver = false;
}

function Update() {

    _animation.CrossFade("Attack");
    _animation["Attack"].speed = 2.5;
}


