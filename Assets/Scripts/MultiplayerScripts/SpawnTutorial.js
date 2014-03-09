/* 
*  This file is part of the Unity networking tutorial by M2H (http://www.M2H.nl)
*  The original author of this code Mike Hergaarden, even though some small parts 
*  are copied from the Unity tutorials/manuals.
*  Feel free to use this code for your own projects, drop me a line if you made something exciting! 
*/
#pragma strict
#pragma implicit
#pragma downcast

public var playerPrefab : Transform;
public var spawnTimePlayer : float;
public var maxSpawnPlayer : int = 5;
public var startPositionPlayer : Vector3;

var playerTransforms : Transform[];

private var numberOfPlayerPrefabs : int = 0;
private var checkTimerPlayer: float;


function Start()
{
    playerTransforms = new Transform[maxSpawnPlayer];
    
    SpawnStartingPlayer();
}

function SpawnStartingPlayer(){
	
    var myNewTrans : Transform;
    
	   checkTimerPlayer = Time.time + spawnTimePlayer;
	   numberOfPlayerPrefabs++;
	   startPositionPlayer = Vector3(1000, 5, 330);
	   //Instantiate a new object for this player, remember; the player is therefore the owner.
	   myNewTrans = Instantiate(playerPrefab, startPositionPlayer, transform.rotation);
       myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfPlayerPrefabs;
       playerTransforms[0] = myNewTrans;
}

function Update()
{
        var myNewTrans : Transform;
        var myPrevTrans : Transform;
        
        // check Spawn for Player
            if(numberOfPlayerPrefabs < maxSpawnPlayer)
            {
                if(Time.time >= checkTimerPlayer) //if the current time elapsed is equal to or greater than the timer
                {
                    myPrevTrans = playerTransforms[numberOfPlayerPrefabs - 1];
                    checkTimerPlayer += spawnTimePlayer; //set the timer again
                    numberOfPlayerPrefabs++;
                   
                    myNewTrans = Instantiate(playerPrefab, myPrevTrans.position, myPrevTrans.rotation);
                    myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfPlayerPrefabs;
                    playerTransforms[numberOfPlayerPrefabs - 1] = myNewTrans;
                }
            }  
}
