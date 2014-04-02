#pragma strict

public var spawnScript : Spawnscript;

public class CaveTrigger extends Photon.MonoBehaviour{

public var unitNumber : int;

private var Cube : GameObject;

public var unitsLeft : int;

public var caveNumber : int;

enum PlayerControlling{
    None,
    Red,
    Blue
}

public var caveControlledBy : PlayerControlling;

function Start () {
     unitsLeft = 10;

     caveControlledBy = PlayerControlling.None;
     
     var t : Transform;
   for (t in transform.GetComponentsInChildren.<Transform>()) {
       if (t.name == "Cube"){ Cube = t.gameObject;}
   }

   spawnScript = GameObject.Find("Spawnscript").GetComponent.<Spawnscript>();
}

function Update () {
	if(unitsLeft == 0)
    {
        Cube.renderer.material.color = Color.black;
    }
}

function OnTriggerEnter(other:Collider){
    // Only take control if you dont already have control
	if(other.tag == "Red"  && caveControlledBy != PlayerControlling.Red){
		Cube.renderer.material.color = Color.red;
        caveControlledBy = PlayerControlling.Red;
        spawnScript.SetBaseControlledBy(1, caveNumber);
        spawnScript.UpdatePlayer1Max(unitsLeft, caveNumber);
	}
	if(other.tag == "Blue" && caveControlledBy != PlayerControlling.Blue){
		Cube.renderer.material.color = Color.blue;
        spawnScript.SetBaseControlledBy(2, caveNumber);
        caveControlledBy = PlayerControlling.Blue;
        spawnScript.UpdatePlayer2Max(unitsLeft, caveNumber);

	}
}
}