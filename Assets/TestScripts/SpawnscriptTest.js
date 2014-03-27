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

private var numberOfplayer1Prefabs : int = 0;
private var checkTimerplayer1: float;

private var endFruitTime1: float;
private var endFruitTime2: float;
private var gameStarted : boolean = false;

private var fruitGrab: boolean = false;

private var playerChoice : String;

public var playerID : int;

var styleRed : GUIStyle;
var styleBlue : GUIStyle;

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
      
    playerChoice = "TutorialPrefabTest";

}

function GetGameStarted()
{
    return gameStarted;
}

function StartSpawning(){
	if(!gameStarted)
    {
    gameStarted = true;

       //cameraForPlayer1.transform.position = startingCameraPosition;
	   checkTimerplayer1 = Time.time + spawnTimeplayer1;
	   numberOfplayer1Prefabs++;
	   startPositionplayer1 = Vector3(1450, 8, 560);
       
	   //Instantiate a new object for this player, remember; the player1 is therefore the owner.
	   myNewTrans = GameObject.Find(playerChoice);
       myNewTrans.GetComponent(PlayerControllerTest).spawnNumber = numberOfplayer1Prefabs;
       player1prefabs[0] = myNewTrans;
    }
    
}

function UpdateMaxSpawn(caveNumber : int)
{
    Debug.Log(caveNumber);
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

function OnGUI()
{

        GUILayout.BeginArea (Rect (Screen.width - 200,0,200,200));
        GUILayout.Label("Red Player", styleRed);
        GUILayout.Label("Max Spawn: " + maxSpawnplayer1.ToString(), styleRed);
        GUILayout.Label("Current Spawn: " + numberOfplayer1Prefabs.ToString(), styleRed);
        GUILayout.EndArea ();
    

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


