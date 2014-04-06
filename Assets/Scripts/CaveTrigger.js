#pragma strict

public var spawnScript : Spawnscript;

public class CaveTrigger extends Photon.MonoBehaviour{

private var Cube : GameObject;

public var unitsLeft : int;

public var caveNumber : int;

enum PlayerControlling{
    None,
    Red,
    Blue,
    Yellow,
    Orange,
    Purple,
    Green
}

public var caveControlledBy : PlayerControlling;

function Start () {
     unitsLeft = 3;

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
    var updateSpawn : boolean = false;
    
    Debug.Log("hit cave");
    Debug.Log(other.tag);
    
    switch(other.tag)
    {
    case "Red":
        if(caveControlledBy != PlayerControlling.Red){
            Cube.renderer.material.color = Color.red;
            caveControlledBy = PlayerControlling.Red;
            updateSpawn = true;
        }
        break;
    case "Yellow":
        if(caveControlledBy != PlayerControlling.Yellow){
            Cube.renderer.material.color = Color.yellow;
            caveControlledBy = PlayerControlling.Yellow;
            updateSpawn = true;
        }
        break;
    case "Blue":
        if(caveControlledBy != PlayerControlling.Blue){
            Cube.renderer.material.color = Color.blue;
            caveControlledBy = PlayerControlling.Blue;
            updateSpawn = true;
        }
        break;
    case "Green":
        if(caveControlledBy != PlayerControlling.Green){
            Cube.renderer.material.color = Color.green;
            caveControlledBy = PlayerControlling.Green;
            updateSpawn = true;
        }
        break;
    case "Purple":
        if(caveControlledBy != PlayerControlling.Purple){
            Cube.renderer.material.color = Color.magenta;
            caveControlledBy = PlayerControlling.Purple;
            updateSpawn = true;
        }
        break;
    case "Orange":
        if(caveControlledBy != PlayerControlling.Orange){
            Cube.renderer.material.color = Color.red;
            caveControlledBy = PlayerControlling.Orange;
            updateSpawn = true;
        }
        break;
    default:
        break;
    }
	if(updateSpawn)
    {
        --unitsLeft;
        
        if(spawnScript.playerID == 1)
            spawnScript.UpdatePlayer1Max(unitsLeft, caveNumber);
        else
            spawnScript.UpdatePlayer2Max(unitsLeft, caveNumber);
	}
	
}
}