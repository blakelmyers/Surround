/* 
*  This file is part of the Unity networking tutorial by M2H (http://www.M2H.nl)
*  The original author of this code Mike Hergaarden, even though some small parts 
*  are copied from the Unity tutorials/manuals.
*  Feel free to use this code for your own projects, drop me a line if you made something exciting! 
*/
#pragma strict
#pragma implicit
#pragma downcast

public var serverPrefab : Transform;
public var clientPrefab : Transform;
public var cameraForPlayer : Transform;
public var cameraDistance : float;
public var spawnTimeServer : float;
public var spawnTimeClient : float;
public var maxSpawnServer : int = 5;
public var maxSpawnClient : int = 5;
public var startPositionServer : Vector3;
public var startPositionClient : Vector3;

var serverTransforms : Transform[];
var clientTransforms : Transform[];

private var numberOfServerPrefabs : int = 0;
private var numberOfClientPrefabs : int = 0;
private var checkTimerServer: float;
private var checkTimerClient: float;
private var gameStarted : boolean = false;

var whichPlayer : int;

var selectionType : GameObject;

enum PlayerType {
    Server = 0,
    Client = 1,
}

function Awake () 
{
    selectionType = GameObject.Find("Selection");
    DontDestroyOnLoad(selectionType);
}
    
function Start()
{
    serverTransforms = new Transform[maxSpawnServer];
    clientTransforms = new Transform[maxSpawnClient];
    
    Debug.Log(selectionType.GetComponent(SelectionScript).selectionChoice);
}

function OnServerInitialized(){
    whichPlayer = PlayerType.Server;
	SpawnStartingPlayer();
}

function OnConnectedToServer(){
    whichPlayer = PlayerType.Client;
	SpawnStartingPlayer();
}

function SpawnStartingPlayer(){
	
	gameStarted = true;
    var startingCameraPosition : Vector3;
	
	if(whichPlayer == PlayerType.Server)
	{
       startingCameraPosition = Vector3(1500, 400, 1000);
       cameraForPlayer.position = startingCameraPosition;
	   checkTimerServer = Time.time + spawnTimeServer;
	   numberOfServerPrefabs++;
	   startPositionServer = Vector3(1450, 8, 560);
	   //Instantiate a new object for this player, remember; the server is therefore the owner.
	   myNewTrans = Network.Instantiate(serverPrefab, startPositionServer, transform.rotation, 0);
       myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfServerPrefabs;
       serverTransforms[0] = myNewTrans;
       
	}
	else   // Client
	{
       startingCameraPosition = Vector3(500, 400, 2050);
       cameraForPlayer.position = startingCameraPosition;
	   checkTimerClient = Time.time + spawnTimeClient;
	   numberOfClientPrefabs++;
	   startPositionClient = Vector3(450, 5, 1500);
	   //Instantiate a new object for this player, remember; the server is therefore the owner.
	   myNewTrans= Network.Instantiate(clientPrefab, startPositionClient, transform.rotation, 0);
       myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfClientPrefabs;
       clientTransforms[0] = myNewTrans;
	}
}

function UnitDied(unitNumber : int)
{
    if(whichPlayer == PlayerType.Server)
    {
        for (var i = unitNumber; i < numberOfServerPrefabs; i++)
        {
            serverTransforms[i-1] = serverTransforms[i];
            serverTransforms[i-1].GetComponent(PlayerController).spawnNumber = i;
        }
        checkTimerServer = Time.time + spawnTimeServer;
        --numberOfServerPrefabs;
    
        if(numberOfServerPrefabs == 0)
        {
            Network.Disconnect(200);
            Application.LoadLevel("MainMenu");
        }
    }
    else //Client
    {
        for (var j = unitNumber; j < numberOfClientPrefabs; j++)
        {
            clientTransforms[j-1] = clientTransforms[j];
            clientTransforms[j-1].GetComponent(PlayerController).spawnNumber = j;
        }
        checkTimerClient = Time.time + spawnTimeClient;
        --numberOfClientPrefabs;
    
        if(numberOfClientPrefabs == 0)
        {
            Network.Disconnect(200);
            Application.LoadLevel("MainMenu");
        }
    }
}

function Update()
{
    if(gameStarted == true)
    {
        var myNewTrans : Transform;
        var myPrevTrans : Transform;

        // check Spawn for Server
        if(whichPlayer == PlayerType.Server)
        {
            if(numberOfServerPrefabs < maxSpawnServer)
            {
                if(Time.time >= checkTimerServer) //if the current time elapsed is equal to or greater than the timer
                {
                    myPrevTrans = serverTransforms[numberOfServerPrefabs - 1];
                    checkTimerServer += spawnTimeServer; //set the timer again
                    numberOfServerPrefabs++;
                   
                    myNewTrans = Network.Instantiate(serverPrefab, myPrevTrans.position, myPrevTrans.rotation, 0);
                    myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfServerPrefabs;
                    myNewTrans.GetComponent(PlayerController).movementActive = myPrevTrans.GetComponent(PlayerController).movementActive;
                    serverTransforms[numberOfServerPrefabs - 1] = myNewTrans;
                }
            }
        }
        
        if(whichPlayer == PlayerType.Client)
        {
            // check Spawn for Server
            if(numberOfClientPrefabs < maxSpawnClient)
            {
                if(Time.time >= checkTimerClient) //if the current time elapsed is equal to or greater than the timer
                {
                    myPrevTrans = clientTransforms[numberOfClientPrefabs - 1];
                    checkTimerClient += spawnTimeClient; //set the timer again
                    numberOfClientPrefabs++;   
                   
                    myNewTrans = Network.Instantiate(clientPrefab, myPrevTrans.position, myPrevTrans.rotation, 0);
                    myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfClientPrefabs;
                    clientTransforms[numberOfClientPrefabs - 1] = myNewTrans;
                }
            }
        }
    }
}

function OnPlayerDisconnected(player: NetworkPlayer) {
	Debug.Log("Clean up after player " + player);
	Network.RemoveRPCs(player);
	Network.DestroyPlayerObjects(player);
	gameStarted = false;
}

function OnDisconnectedFromServer(info : NetworkDisconnection) {
	Debug.Log("Clean up a bit after server quit");
	gameStarted = false;
	Network.RemoveRPCs(Network.player);
	Network.DestroyPlayerObjects(Network.player);
	
	/* 
	* Note that we only remove our own objects, but we cannot remove the other players 
	* objects since we don't know what they are; we didn't keep track of them. 
	* In a game you would usually reload the level or load the main menu level anyway ;).
	* 
	* In fact, we could use "Application.LoadLevel(Application.loadedLevel);" here instead to reset the scene.
	*/
	Application.LoadLevel(Application.loadedLevel);
}