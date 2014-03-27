#pragma strict

public var tutorialGui : TutorialGUI;

function Start () {

}

function Update () {

}

function OnTriggerEnter(other:Collider){
    if(other.tag == "Red"){
        Destroy(this.gameObject);
    }
    if(other.tag == "Blue"){
        renderer.material.color = Color.blue;
    }
}