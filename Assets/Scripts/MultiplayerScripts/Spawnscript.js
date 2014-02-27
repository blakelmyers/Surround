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

var whichPlayer : int;

enum PlayerType {
    Server = 0,
    Client = 1,
}

function OnServerInitialized(){
    whichPlayer = PlayerType.Server;
	Spawnplayer();
}

function OnConnectedToServer(){
    whichPlayer = PlayerType.Client;
	Spawnplayer();
}

function Spawnplayer(){
	
	var myNewTrans : Transform;
	var startPosition : Vector3;
	
	if(whichPlayer == PlayerType.Server)
	{
	   startPosition = Vector3(1250, 5, 900);
	   //Instantiate a new object for this player, remember; the server is therefore the owner.
	   myNewTrans = Network.Instantiate(serverPrefab, startPosition, transform.rotation, 0);
	}
	else   // Client
	{
	   startPosition = Vector3(1100, 5, 950);
	   //Instantiate a new object for this player, remember; the server is therefore the owner.
	   myNewTrans= Network.Instantiate(clientPrefab, startPosition, transform.rotation, 0);
	}
}




function OnPlayerDisconnected(player: NetworkPlayer) {
	Debug.Log("Clean up after player " + player);
	Network.RemoveRPCs(player);
	Network.DestroyPlayerObjects(player);
}

function OnDisconnectedFromServer(info : NetworkDisconnection) {
	Debug.Log("Clean up a bit after server quit");
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