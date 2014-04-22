#pragma strict

#pragma strict

public var spawnScript : Spawnscript;




public var caveControlledBy : PlayerControlling;

public var caveInt : int;

public class CaveTrigger extends Photon.MonoBehaviour{

private var Cube : GameObject;

private var caveText : GameObject;

public var unitsLeft : int;

public var caveNumber : int;

private var caveCounter : int = 0;

private var lockTime : float = 10;  // 3 seconds

private var unlockTimer : float;

private var waitingToUnlock : boolean = false;

private var lockedOnFirstHit : boolean = false;

public var ohnoSound : AudioClip;


enum PlayerControlling{
    None,
    Red,
    Blue,
    Yellow,
    Orange,
    Purple,
    Green
}


function Start () {
     unitsLeft = 3;

     caveControlledBy = PlayerControlling.None;
     caveInt = 0;
     var t : Transform;
   for (t in transform.GetComponentsInChildren.<Transform>()) {
       if (t.name == "Cube"){ Cube = t.gameObject;}
       if (t.name == "Locked"){ caveText = t.gameObject;}
   }
     caveText.GetComponent(TextMesh).text = "";
   spawnScript = GameObject.Find("Spawnscript").GetComponent.<Spawnscript>();
}

function Update () {
    if(unitsLeft == 0)
    {
       // Cube.renderer.material.color = Color.black;
    }
    
    if(waitingToUnlock)
    {
        // check timer
        if(Time.time >= unlockTimer) 
        {
            waitingToUnlock = false;
            
            caveText.GetComponent(TextMesh).text = "";
            //caveControlledBy = PlayerControlling.None;
        }
    }
}

function OnTriggerEnter(other:Collider){
    // Only take control if you dont already have control
    var updateSpawn : boolean = false;
    
    var lockCave : boolean = false;
    
   // Debug.Log("hit cave");
   // Debug.Log(other.tag);
    var alreadyCaptured : boolean = true;
    
    if(spawnScript.gameStarted)
    {
        if(!waitingToUnlock)
        {
            Debug.Log("controlledby:");
            Debug.Log(caveControlledBy);
            if(caveControlledBy == PlayerControlling.None)
            {
            alreadyCaptured = false;
            Debug.Log("first capture");
            
            }
        waitingToUnlock = true;
        ++caveCounter;
             Debug.Log("hit cave" +caveCounter);
            switch(other.tag)
            {
            case "Red":
                if(caveControlledBy != PlayerControlling.Red){
                    Cube.renderer.material.color = Color.red;
                    caveControlledBy = PlayerControlling.Red;
                    caveInt = 1;
                    updateSpawn = true;
                }
                else
                {
                    lockCave = true;
                }
                break;
            case "Yellow":
                if(caveControlledBy != PlayerControlling.Yellow){
                    Cube.renderer.material.color = Color.yellow;
                    caveControlledBy = PlayerControlling.Yellow;
                    caveInt = 3;
                    updateSpawn = true;
                }
                else
                {
                    lockCave = true;
                }
                break;
            case "Blue":
                if(caveControlledBy != PlayerControlling.Blue){
                    Cube.renderer.material.color = Color.blue;
                    caveControlledBy = PlayerControlling.Blue;
                    caveInt = 2;
                    updateSpawn = true;
                }
                else
                {
                    lockCave = true;
                }
                break;
            case "Green":
                if(caveControlledBy != PlayerControlling.Green){
                    Cube.renderer.material.color = Color.green;
                    caveControlledBy = PlayerControlling.Green;
                    caveInt = 6;
                    updateSpawn = true;
                }
                else
                {
                    lockCave = true;
                }
                break;
            case "Purple":
                if(caveControlledBy != PlayerControlling.Purple){
                    Cube.renderer.material.color = Color.magenta;
                    caveControlledBy = PlayerControlling.Purple;
                    caveInt = 5;
                    updateSpawn = true;
                }
                else
                {
                    lockCave = true;
                }
                break;
            case "Orange":
                if(caveControlledBy != PlayerControlling.Orange){
                    Cube.renderer.material.color = Color.red;
                    caveControlledBy = PlayerControlling.Orange;
                    caveInt = 4;
                    updateSpawn = true;
                }
                else
                {
                    lockCave = true;
                }
                break;
            default:
                break;
            }
            if(lockCave)
            {
                waitingToUnlock = true;
                caveText.GetComponent(TextMesh).text = "Locked";
                unlockTimer = Time.time + lockTime;
            }
            if(updateSpawn)
            {        
                --unitsLeft;
                
                
                caveText.GetComponent(TextMesh).text = "Locked";
                unlockTimer = Time.time + lockTime;
                
                /*
                if(spawnScript.playerID == 1){
                    spawnScript.UpdatePlayer1Max(unitsLeft, caveNumber);
                    spawnScript.player1Caves += 1;
                    if(taken){
                        spawnScript.player2Caves -= 1;
                    }
                    spawnScript.sizeChange();
                }
                else if(spawnScript.playerID == 2){
                    spawnScript.UpdatePlayer2Max(unitsLeft, caveNumber);
                    spawnScript.player2Caves += 1;
                    if(taken){
                        spawnScript.player1Caves -= 1;
                    }
                    spawnScript.sizeChange();
                }
                */
                
                // i took control
                if(spawnScript.playerColor == other.tag)
                {
                    
                    if(spawnScript.playerID == 1){
                        spawnScript.UpdatePlayer1Max(unitsLeft, caveNumber);
                        spawnScript.player1Caves += 1;
                        if(alreadyCaptured) 
                        {  
                            spawnScript.player2Caves -= 1;
                            Debug.Log("decrease for player 2");
                        }
                        spawnScript.sizeChange1();
                        
                    }
                    else if(spawnScript.playerID == 2){
                        spawnScript.UpdatePlayer2Max(unitsLeft, caveNumber);
                        spawnScript.player2Caves += 1;
                        if(alreadyCaptured) 
                        {  
                            spawnScript.player1Caves -= 1;
                            Debug.Log("decrease for player 2");
                        }
                        spawnScript.sizeChange2();
                        //Debug.Log("increase cave for player 2");
                    }
                }
                else  // other player took control
                {
                    audio.PlayOneShot(ohnoSound);
                    if(spawnScript.playerID == 1){
                        if(alreadyCaptured) 
                        {  
                            spawnScript.player1Caves -= 1;
                            spawnScript.sizeDecrease1();
                            Debug.Log("decrease for player 1");
                        }
                        spawnScript.player2Caves += 1;
                        //Debug.Log("decrease cave for player 1");
                     }
                    else if(spawnScript.playerID == 2){
                        if(alreadyCaptured) 
                        {  
                            spawnScript.player2Caves -= 1;
                            spawnScript.sizeDecrease2();
                            Debug.Log("decrease for player 2");
                        }
                        spawnScript.player1Caves += 1;
                        //Debug.Log("decrease cave for player 2");
                    }
                }
                    
                //photonView.RPC("PlayerTookBase", PhotonTargets.Others, caveControlledBy);   
            }
        }
    }
}

/*	@RPC
	function PlayerTookBase(hasCave : PlayerControlling)
	{
	    UpdateUnits(hasCave);
	}

	function UpdateUnits(hasCave : PlayerControlling)
	{
	    
	    
	    caveControlledBy = hasCave;
	    
	    if(spawnScript.playerID == 1)
	        spawnScript.UpdatePlayer1Max(unitsLeft, caveNumber);
	    else if(spawnScript.playerID == 2)
	        spawnScript.UpdatePlayer2Max(unitsLeft, caveNumber);
	        
	    switch(caveControlledBy)
	    {
	    case PlayerControlling.Red:
	            Cube.renderer.material.color = Color.red;
	        break;
	    case PlayerControlling.Yellow:
	            Cube.renderer.material.color = Color.yellow;
	        break;
	    case PlayerControlling.Blue:
	            Cube.renderer.material.color = Color.blue;
	        break;
	    case PlayerControlling.Green:
	            Cube.renderer.material.color = Color.green;
	        break;
	    case PlayerControlling.Purple:
	            Cube.renderer.material.color = Color.magenta;
	        break;
	    case PlayerControlling.Orange:
	            Cube.renderer.material.color = Color.red;
	        break;
	    default:
	        break;
	    }
	}*/
}