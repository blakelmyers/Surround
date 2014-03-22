/* 
*  This file is part of the Unity networking tutorial by M2H (http://www.M2H.nl)
*  The original author of this code Mike Hergaarden, even though some small parts 
*  are copied from the Unity tutorials/manuals.
*  Feel free to use this code for your own projects, drop me a line if you made something exciting! 
*/
#pragma strict
#pragma implicit
#pragma downcast

public class Spawnscript extends Photon.MonoBehaviour{

public var player1Prefab : Transform;
public var player2Prefab : Transform;
public var player1PrefabYellow : Transform;
public var player2PrefabPurple : Transform;
public var player1PrefabRed : Transform;
public var player2PrefabBlue : Transform;
public var cameraForPlayer1 : GameObject;
public var cameraForPlayer2 : GameObject;
public var cameraDistance : float;
public var spawnTimeplayer1 : float;
public var spawnTimeplayer2 : float;
public var maxSpawnplayer1 : int = 5;
public var maxSpawnplayer2 : int = 5;
public var startPositionplayer1 : Vector3;
public var startPositionplayer2 : Vector3;

var player1prefabs : GameObject[];
var player2prefabs : GameObject[];

private var numberOfplayer1Prefabs : int = 0;
private var numberOfplayer2Prefabs : int = 0;
private var checkTimerplayer1: float;
private var checkTimerplayer2: float;
private var gameStarted : boolean = false;

public var playerID : int;

var selectionType : GameObject;
var connectionObject : GameObject;

enum PlayerType {
    player1 = 0,
    player2 = 1,
}

function Awake () 
{
    selectionType = GameObject.Find("Selection");
    DontDestroyOnLoad(selectionType);
    
    connectionObject = GameObject.Find("Connect");
    DontDestroyOnLoad(connectionObject);
    
}
    
function Start()
{
    player1prefabs = new GameObject[maxSpawnplayer1];
    player2prefabs = new GameObject[maxSpawnplayer2];
    
    // Set Default values
    player1Prefab = player1PrefabYellow;
    player2Prefab = player2PrefabPurple;
    
    Debug.Log(selectionType.GetComponent(SelectionScript).selectionChoice);
    
    switch(selectionType.GetComponent(SelectionScript).selectionChoice)
    {
    case DinosaurEnum.YellowTall:
        player1Prefab = player1PrefabYellow;
        break;
    case DinosaurEnum.RedTall:
        player1Prefab = player1PrefabRed;
        break;
    case DinosaurEnum.PurpleFat:
        player2Prefab = player2PrefabPurple;
        break;
    case DinosaurEnum.BlueFat:
        player2Prefab = player2PrefabBlue;
        break;
    }
    
    //SpawnStartingPlayer();
}

function GetGameStarted()
{
    return gameStarted;
}

function StartSpawning(){
	
	gameStarted = true;
    var startingCameraPosition : Vector3;
	playerID = PhotonNetwork.player.ID;
	if(playerID == 1){
       cameraForPlayer1.SetActive(true);
       cameraForPlayer2.SetActive(false);
       startingCameraPosition = Vector3(1500, 400, 1000);
       cameraForPlayer1.transform.position = startingCameraPosition;
	   checkTimerplayer1 = Time.time + spawnTimeplayer1;
	   numberOfplayer1Prefabs++;
	   startPositionplayer1 = Vector3(1450, 8, 560);
       
	   //Instantiate a new object for this player, remember; the player1 is therefore the owner.
	   myNewTrans = GameObject.Find("YellowPrefab(Clone)");
       myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer1Prefabs;
       player1prefabs[0] = myNewTrans;
       
	}
	else if (playerID == 2)   // player2
	{
       cameraForPlayer2.SetActive(true);
       cameraForPlayer1.SetActive(false);
       
       startingCameraPosition = Vector3(500, 400, 2050);
       cameraForPlayer2.transform.position = startingCameraPosition;
	   checkTimerplayer2 = Time.time + spawnTimeplayer2;
	   numberOfplayer2Prefabs++;
	   startPositionplayer2 = Vector3(450, 5, 1500);
       
	   //Instantiate a new object for this player, remember; the player1 is therefore the owner.
	   myNewTrans = GameObject.Find("PurplePrefab(Clone)");
       myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer2Prefabs;
       player2prefabs[0] = myNewTrans;
	}
    
}

function UnitDied(unitNumber : int)
{
    if(playerID == 1)
    {
        for (var i = unitNumber; i < numberOfplayer1Prefabs; i++)
        {
            player1prefabs[i-1] = player1prefabs[i];
            player1prefabs[i-1].GetComponent(PlayerController).spawnNumber = i;
        }
        checkTimerplayer1 = Time.time + spawnTimeplayer1;
        --numberOfplayer1Prefabs;
    
        if(numberOfplayer1Prefabs == 0)
        {
           // Network.Disconnect(200);
            Application.LoadLevel("MainMenu");
        }
    }
    else //player2
    {
        for (var j = unitNumber; j < numberOfplayer2Prefabs; j++)
        {
            player2prefabs[j-1] = player2prefabs[j];
            player2prefabs[j-1].GetComponent(PlayerController).spawnNumber = j;
        }
        checkTimerplayer2 = Time.time + spawnTimeplayer2;
        --numberOfplayer2Prefabs;
    
        if(numberOfplayer2Prefabs == 0)
        {
            //Network.Disconnect(200);
            Application.LoadLevel("MainMenu");
        }
    }
}

function Update()
{
   
    if(gameStarted == true)
    {
        var myNewTrans : GameObject;
        var myPrevTrans : GameObject;

        // check Spawn for player1
        if(playerID == 1)
        {
            if(numberOfplayer1Prefabs < maxSpawnplayer1)
            {
                if(Time.time >= checkTimerplayer1) //if the current time elapsed is equal to or greater than the timer
                {
                    myPrevTrans = player1prefabs[numberOfplayer1Prefabs - 1];
                    checkTimerplayer1 += spawnTimeplayer1; //set the timer again
                    numberOfplayer1Prefabs++;
                   
                    myNewTrans = PhotonNetwork.Instantiate("YellowPrefab", myPrevTrans.transform.position, myPrevTrans.transform.rotation, 0);
                    myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer1Prefabs;
                    myNewTrans.GetComponent(PlayerController).movementActive = myPrevTrans.GetComponent(PlayerController).movementActive;
                    player1prefabs[numberOfplayer1Prefabs - 1] = myNewTrans;
                }
            }
        }
        
        if(playerID == 2)
        {
            // check Spawn for player1
            if(numberOfplayer2Prefabs < maxSpawnplayer2)
            {
                if(Time.time >= checkTimerplayer2) //if the current time elapsed is equal to or greater than the timer
                {
                    myPrevTrans = player2prefabs[numberOfplayer2Prefabs - 1];
                    checkTimerplayer2 += spawnTimeplayer2; //set the timer again
                    numberOfplayer2Prefabs++;   
                   
                    myNewTrans = PhotonNetwork.Instantiate("PurplePrefab", myPrevTrans.transform.position, myPrevTrans.transform.rotation, 0);
                    myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer2Prefabs;
                    player2prefabs[numberOfplayer2Prefabs - 1] = myNewTrans;
                }
            }
        }
        }
    
}

}
