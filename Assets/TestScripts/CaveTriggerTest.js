#pragma strict

public var unitNumber : GameObject;

public var spawnScript : SpawnscriptTest;

private var unitsLeft : int;

private var Cube : GameObject;

enum PlayerControlling{
    None,
    Red,
    Blue
}
public var caveControlledBy : PlayerControlling;

function Start () {
     unitsLeft = 10;
     
     var t : Transform;
   for (t in transform.GetComponentsInChildren.<Transform>()) {
       if (t.name == "Cube"){ Cube = t.gameObject;}
   }

   spawnScript = GameObject.Find("Spawnscript").GetComponent.<SpawnscriptTest>();
}

function Update () {
	
}

function OnTriggerEnter(other:Collider){
	if(other.tag == "Red"  && caveControlledBy != PlayerControlling.Red){
        Cube.renderer.material.color = Color.red;
        caveControlledBy = PlayerControlling.Red;
        spawnScript.UpdatePlayer1Max();
        --unitsLeft;
    }

}
