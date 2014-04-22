﻿#pragma strict

#pragma strict

public var spawnScript : Spawnscript;

public class CaveTrigger extends Photon.MonoBehaviour{

private var Cube : GameObject;

private var caveText : GameObject;

public var unitsLeft : int;

public var caveNumber : int;

private var lockTime : float = 10;  // 3 seconds

private var unlockTimer : float;

private var waitingToUnlock : boolean = false;


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

public var caveControlledBy : PlayerControlling;

function Start () {
     unitsLeft = 3;

     caveControlledBy = PlayerControlling.None;
     
     var t : Transform;
   for (t in transform.GetComponentsInChildren.<Transform>()) {
       if (t.name == "Cube"){ Cube = t.gameObject;}
       if (t.name == "Locked"){ caveText = t.gameObject;}
   }
    
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
            
            caveText.GetComponent(TextMesh).text = "U";
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
    

        if(!waitingToUnlock)
        {
            switch(other.tag)
            {
            case "Red":
                if(caveControlledBy != PlayerControlling.Red){
                    Cube.renderer.material.color = Color.red;
                    caveControlledBy = PlayerControlling.Red;
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
                caveText.GetComponent(TextMesh).text = "L";
                unlockTimer = Time.time + lockTime;
            }
            if(updateSpawn)
            {        
                --unitsLeft;
                
                waitingToUnlock = true;
                caveText.GetComponent(TextMesh).text = "L";
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
                
                if(spawnScript.playerColor == other.tag)
                {
                    Debug.Log("update me");
                    if(spawnScript.playerID == 1){
                        spawnScript.UpdatePlayer1Max(unitsLeft, caveNumber);
                        spawnScript.player1Caves += 1;
                        spawnScript.sizeChange1();
                    }
                    else if(spawnScript.playerID == 2){
                        spawnScript.UpdatePlayer2Max(unitsLeft, caveNumber);
                        spawnScript.player2Caves += 1;
                        spawnScript.sizeChange2();
                    }
                }
                else
                {
                    audio.PlayOneShot(ohnoSound);
                    if(spawnScript.playerID == 1){
                        //spawnScript.DecreasePlayer1Max(unitsLeft, caveNumber);
                        spawnScript.player1Caves -= 1;
                        spawnScript.sizeDecrease1();
                        }
                    else if(spawnScript.playerID == 2){
                        //spawnScript.DecreasePlayer2Max(unitsLeft, caveNumber);
                        spawnScript.player2Caves -= 1;
                        spawnScript.sizeDecrease2();
                        }
                }
                    
                //photonView.RPC("PlayerTookBase", PhotonTargets.Others, caveControlledBy);   
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