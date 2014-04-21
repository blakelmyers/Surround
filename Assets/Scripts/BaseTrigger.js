#pragma strict

public var spawnScript : Spawnscript;

public class BaseTrigger extends Photon.MonoBehaviour{

private var Cube : GameObject;

public var healthLeft : int;

public var baseNumber : int;


function Start () {
     healthLeft = 20;


   spawnScript = GameObject.Find("Spawnscript").GetComponent.<Spawnscript>();
}

function Update () {
	if(healthLeft == 0)
    {
        this.renderer.material.color = Color.black;
        
        if(baseNumber == 1)
        {
            spawnScript.playerWhoWon = 2;
        }
        else if (baseNumber == 2)
        {
            spawnScript.playerWhoWon = 1;
        }
    }
}

function OnTriggerEnter(other:Collider){
    
    if(spawnScript.playerID == 1 && baseNumber == 2)
    {
        --healthLeft;
        Debug.Log("hit p2");
    }
    if(spawnScript.playerID == 2 && baseNumber == 1)
    {
        --healthLeft;
        Debug.Log("hit p1");
    }
    
	
}
}