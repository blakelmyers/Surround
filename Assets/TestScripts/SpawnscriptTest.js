/* 
*  This file is part of the Unity networking tutorial by M2H (http://www.M2H.nl)
*  The original author of this code Mike Hergaarden, even though some small parts 
*  are copied from the Unity tutorials/manuals.
*  Feel free to use this code for your own projects, drop me a line if you made something exciting! 
*/
#pragma strict
#pragma implicit
#pragma downcast

public var cameraForPlayer1 : GameObject;
public var cameraDistance : float;
public var spawnTimeplayer1 : float;
public var maxSpawnplayer1 : int = 5;
public var startPositionplayer1 : Vector3;

var player1prefabs : GameObject[];

public var playerPrefab : GameObject;
public var startingPrefab : GameObject;
private var numberOfplayer1Prefabs : int = 0;
private var checkTimerplayer1: float;
public var absoluteMaxSpawnplayer1 : int = 10;

private var endFruitTime1: float;
private var endFruitTime2: float;
private var gameStarted : boolean = false;

private var fruitGrab: boolean = false;

private var playerChoice : String;

public var playerID : int;

var styleRed : GUIStyle;
var styleGreen : GUIStyle;
var styleLock : GUIStyle;
var styleSpeed : GUIStyle;
var styleSpeedOn : GUIStyle;
var styleRainbow : GUIStyle;
var styleSpeedOff: GUIStyle;
var styleYellow : GUIStyle;
var styleToolBar: GUIStyle;
var styleLabel : GUIStyle;


var selectionType : SelectionChoice;
var connectionObject : GameObject;

enum PlayerType {
    player1 = 0,
    player2 = 1,
}

function Awake () 
{
    //DontDestroyOnLoad(GameObject.Find("Selection"));   
}
    
function Start()
{
    player1prefabs = new GameObject[15];
      
    playerChoice = "TutorialPrefabTest1";

}

function GetGameStarted()
{
    return gameStarted;
}

function StartSpawning(){
	if(!gameStarted)
    {   
       //cameraForPlayer1.transform.position = startingCameraPosition;
	   checkTimerplayer1 = Time.time + spawnTimeplayer1;
	   numberOfplayer1Prefabs++;
	   startPositionplayer1 = Vector3(1450, 8, 560);
       
	   //Instantiate a new object for this player, remember; the player1 is therefore the owner.
	   
       startingPrefab.GetComponent(PlayerControllerTest).spawnNumber = numberOfplayer1Prefabs;
       player1prefabs[0] = startingPrefab;
       gameStarted = true;
    }
    
}

function UpdatePlayer1Max()
{
    
        absoluteMaxSpawnplayer1 += 10;
        maxSpawnplayer1 += 3;
    
}

function fruitTimer(time : float){
		endFruitTime1 = Time.time + 5;

}

function UnitDied(unitNumber : int)
{

        for (var i = unitNumber; i < numberOfplayer1Prefabs; i++)
        {
            player1prefabs[i-1] = player1prefabs[i];
            player1prefabs[i-1].GetComponent(PlayerControllerTest).spawnNumber = i;
        }
        checkTimerplayer1 = Time.time + spawnTimeplayer1;
        --numberOfplayer1Prefabs;
    
        if(numberOfplayer1Prefabs == 0)
        {
           // Network.Disconnect(200);
            Debug.Log("All Units dead");
        }

}

function PickedUpFruit(){
    for(var i = 0; i < numberOfplayer1Prefabs; ++i)
    {
        player1prefabs[i].GetComponent(PlayerControllerTest).fruitBombs += 1;
        player1prefabs[i].GetComponent(PlayerControllerTest).pickedUpFruit = true;
    }

}
function OnGUI()
{
if(gameStarted == true)
    {
    /*
        GUILayout.BeginArea (Rect (Screen.width - 200,0,200,200));
        GUILayout.Label("Yellow Player", styleRed);
        GUILayout.Label("Total Units:   " + absoluteMaxSpawnplayer1.ToString(), styleRed);
        GUILayout.Label("Spawn Limit: " + maxSpawnplayer1.ToString(), styleRed);
        GUILayout.Label("Current Spawn: " + numberOfplayer1Prefabs.ToString(), styleRed);
        GUILayout.EndArea ();
        */
		GUI.Box (Rect(0, Screen.height - 70, Screen.width, 70), "", styleToolBar);
        GUI.Box (Rect(50, Screen.height - 70, 100, 70), "DINOWARS!", styleLabel);
        GUI.Label(Rect (Screen.width - 200,Screen.height - 70,200,70), "Herd Size/ Herd Capacity \n " + numberOfplayer1Prefabs.ToString() + "/" + maxSpawnplayer1.ToString(), styleYellow);
        if(player1prefabs[0] != 0)
        { 
            if(player1prefabs[0].GetComponent(PlayerControllerTest).movementLock)
            {             
                GUI.Box (Rect (Screen.width/2+35,Screen.height - 70,70,70), "", styleLock);
            }
            if(!(player1prefabs[0].GetComponent(PlayerControllerTest).speedAvailable))
            {
            	GUI.Box (Rect (Screen.width/2-35,Screen.height - 70,70,70), "", styleSpeedOff);
            }
            if(player1prefabs[0].GetComponent(PlayerControllerTest).speedAvailable)
            {             
                GUI.Box (Rect (Screen.width/2-35,Screen.height - 70,70,70), "", styleSpeed);
            }
            if(player1prefabs[0].GetComponent(PlayerControllerTest).speedActive)
            {             
                GUI.Box (Rect (Screen.width/2-35,Screen.height - 70,70,70), "", styleSpeedOn);
            }
           	GUI.Box (Rect (Screen.width/2-35*3,Screen.height - 70,70,70), player1prefabs[0].GetComponent(PlayerControllerTest).fruitBombs.ToString(), styleRainbow);      
                     
        }
    }

}

function Update()
{
   
    if(gameStarted == true)
    {
        var myNewTrans : GameObject;
        var myPrevTrans : GameObject;


            if(numberOfplayer1Prefabs < maxSpawnplayer1)
            {
                if(Time.time >= checkTimerplayer1) //if the current time elapsed is equal to or greater than the timer
                {
                    Debug.Log(numberOfplayer1Prefabs);
                    myPrevTrans = player1prefabs[numberOfplayer1Prefabs - 1];
                    checkTimerplayer1 += spawnTimeplayer1; //set the timer again
                    ++numberOfplayer1Prefabs;
                    Debug.Log(numberOfplayer1Prefabs);
                    myNewTrans = Instantiate(playerPrefab, myPrevTrans.transform.position, myPrevTrans.transform.rotation);
                    myNewTrans.tag = "Red";
                    myNewTrans.GetComponent(PlayerControllerTest).spawnNumber = numberOfplayer1Prefabs;
                    myNewTrans.GetComponent(PlayerControllerTest).movementActive = myPrevTrans.GetComponent(PlayerControllerTest).movementActive;
                    //myNewTrans.GetComponent(PlayerControllerTest).movementLock = myPrevTrans.GetComponent(PlayerControllerTest).movementLock;
                    player1prefabs[numberOfplayer1Prefabs - 1] = myNewTrans;
                }
            }
            if(fruitGrab){//IF FRUIT IS BUGGY ITS CAUSE THIS CODE IS SHITTY
	            if(Time.time>=endFruitTime1){
	            	for(var i = 0; i<numberOfplayer1Prefabs; i++){
	            		player1prefabs[i].GetComponent(PlayerControllerTest).grabbedFruit = false;
	            	}
	            	fruitGrab=false;
	            }
	           	else{
	           		for(var j = 0; j<numberOfplayer1Prefabs; j++){
	            		player1prefabs[j].GetComponent(PlayerControllerTest).grabbedFruit = true;
	            	}
	           	}
           	}
        
        
 
        }
    
}


