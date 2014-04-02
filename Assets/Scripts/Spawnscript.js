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

public var cameraForPlayer1 : GameObject;
public var cameraForPlayer2 : GameObject;
public var cameraDistance : float;
public var spawnTimeplayer1 : float;
public var spawnTimeplayer2 : float;
public var absoluteMaxSpawnplayer1 : int = 10;
public var absoluteMaxSpawnplayer2 : int = 10;
public var maxSpawnplayer1 : int = 5;
public var maxSpawnplayer2 : int = 5;
public var startPositionplayer1 : Vector3;
public var startPositionplayer2 : Vector3;

public var cave1 : CaveTrigger;
public var cave2 : CaveTrigger;

var player1prefabs : GameObject[];
var player2prefabs : GameObject[];

private var numberOfplayer1Prefabs : int = 0;
private var numberOfplayer2Prefabs : int = 0;
private var checkTimerplayer1: float;
private var checkTimerplayer2: float;
private var endFruitTime1: float;
private var endFruitTime2: float;
private var gameStarted : boolean = false;

private var fruitGrab: boolean = false;

private var playerChoice : String;

var PV: PhotonView;

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

    PV = gameObject.GetComponent(PhotonView);
    player1prefabs = new GameObject[15];
    player2prefabs = new GameObject[15];
      
    selectionType = GameObject.Find("Selection").GetComponent(SelectionChoice);
    
    Debug.Log(selectionType.selectionValue);
    
    playerChoice = "YellowPrefab";
    
    switch(selectionType.GetComponent(SelectionChoice).selectionValue)
    {
    case DinosaurEnum.YellowTall:
        playerChoice = "YellowPrefab";
        break;
    case DinosaurEnum.RedTall:
        playerChoice = "RedPrefab";
        break;
    case DinosaurEnum.PurpleFat:
        playerChoice = "PurplePrefab";
        break;
    case DinosaurEnum.BlueFat:
        playerChoice = "BluePrefab";
        break;
    }

    cave1 = GameObject.Find("Cave1Prefab").GetComponent.<CaveTrigger>();
    cave2 = GameObject.Find("Cave2Prefab").GetComponent.<CaveTrigger>();
}

function GetGameStarted()
{
    return gameStarted;
}

function StartSpawning(){

 gameStarted = true;
    var startingCameraPosition : Vector3;
 playerID = PhotonNetwork.player.ID;
    Debug.Log(playerID);
 if(playerID == 1){
       cameraForPlayer1.SetActive(true);
       cameraForPlayer2.SetActive(false);
       startingCameraPosition = Vector3(1500, 400, 1000);
       cameraForPlayer1.transform.position = startingCameraPosition;
    checkTimerplayer1 = Time.time + spawnTimeplayer1;
    numberOfplayer1Prefabs++;
    startPositionplayer1 = Vector3(1450, 8, 560);
       
    //Instantiate a new object for this player, remember; the player1 is therefore the owner.
    myNewTrans = GameObject.Find(playerChoice+"(Clone)");
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
       Debug.Log("start spawngin");
    //Instantiate a new object for this player, remember; the player1 is therefore the owner.
    myNewTrans = GameObject.Find(playerChoice+"(Clone)");
       myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer2Prefabs;
       player2prefabs[0] = myNewTrans;
 }
    }
}

function SetBaseControlledBy(playerTag : int,  caveNumber : int)
{

}

function UpdatePlayer1Max(unitsLeft : int, caveNumber : int)
{
    if(caveNumber == 1)
    {
        absoluteMaxSpawnplayer1 += cave1.unitsLeft;
        maxSpawnplayer1 += 5;
    }
    else if(caveNumber == 2)
    {
        absoluteMaxSpawnplayer1 += cave2.unitsLeft;
        maxSpawnplayer1 += 5;
    }

}

function UpdatePlayer2Max(unitsLeft : int, caveNumber : int)
{
    if(caveNumber == 1)
    {
        absoluteMaxSpawnplayer2 += cave1.unitsLeft;
        maxSpawnplayer2 += 5;
    }
    else if(caveNumber == 2)
    {
        absoluteMaxSpawnplayer2 += cave2.unitsLeft;
        maxSpawnplayer2 += 5;
    }
}

function DecreaseCaveUnits(caveNumber : int)
{
    if(caveNumber == 1)
    {
        cave1.unitsLeft -= 1;
    }
    else if(caveNumber == 2)
    {
        cave2.unitsLeft -= 1;
    }
}

function fruitTimer(time : float){
 if(playerID==1)
     endFruitTime1 = Time.time + 5;
 else
     endFruitTime2 = Time.time + 5;
 fruitGrab=true;
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
        --absoluteMaxSpawnplayer1;
    
        // start using reserve units
        if(absoluteMaxSpawnplayer1 <= maxSpawnplayer1)
        {
            maxSpawnplayer1 = absoluteMaxSpawnplayer1;
        }
        
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
        --absoluteMaxSpawnplayer2;
    
        // start using reserve units
        if(absoluteMaxSpawnplayer2 <= maxSpawnplayer2)
        {
            maxSpawnplayer2 = absoluteMaxSpawnplayer2;
        } 
        if(numberOfplayer2Prefabs == 0)
        {
            //Network.Disconnect(200);
            Application.LoadLevel("MainMenu");
        }
    }
    
}

function OnGUI()
{
    if(gameStarted)
    {
    if(playerID == 1)
    {
        GUILayout.BeginArea (Rect (Screen.width - 200,0,200,200));
        GUILayout.Label("Red Player", styleRed);
        GUILayout.Label("Abs Max Spawn: " + absoluteMaxSpawnplayer1.ToString(), styleRed);
        GUILayout.Label("Max Spawn: " + maxSpawnplayer1.ToString(), styleRed);
        GUILayout.Label("Current Spawn: " + numberOfplayer1Prefabs.ToString(), styleRed);
        GUILayout.EndArea ();
    }
    else{
        GUILayout.BeginArea (Rect (Screen.width - 200,0,200,200));
        GUILayout.Label("Blue Player", styleBlue);
        GUILayout.Label("Abs Max Spawn: " + absoluteMaxSpawnplayer2.ToString(), styleBlue);
        GUILayout.Label("Max Spawn: " + maxSpawnplayer2.ToString(), styleBlue);
        GUILayout.Label("Current Spawn: " + numberOfplayer2Prefabs.ToString(), styleBlue);
        GUILayout.EndArea ();
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
                        checkTimerplayer1 = Time.time + spawnTimeplayer1; //set the timer again
                        numberOfplayer1Prefabs++;
                       
                        myNewTrans = PhotonNetwork.Instantiate(playerChoice, myPrevTrans.transform.position, myPrevTrans.transform.rotation, 0);
                        myNewTrans.tag = "Red";
                        myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer1Prefabs;
                        myNewTrans.GetComponent(PlayerController).movementActive = myPrevTrans.GetComponent(PlayerController).movementActive;
                        myNewTrans.GetComponent(PlayerController).movementLock = myPrevTrans.GetComponent(PlayerController).movementLock;
                        player1prefabs[numberOfplayer1Prefabs - 1] = myNewTrans;
                    }
                }
                if(fruitGrab){//IF FRUIT IS BUGGY ITS CAUSE THIS CODE IS SHITTY
                 if(Time.time>=endFruitTime1){
                     for(var i = 0; i<numberOfplayer1Prefabs; i++){
                         player1prefabs[i].GetComponent(PlayerController).grabbedFruit = false;
                     }
                     fruitGrab=false;
                 }
                 else{
                     for(var j = 0; j<numberOfplayer1Prefabs; j++){
                         player1prefabs[j].GetComponent(PlayerController).grabbedFruit = true;
                     }
                 }
             }
           
        }
        
        if(playerID == 2)
        {
        
            // check Spawn for player1
            if(numberOfplayer2Prefabs < maxSpawnplayer2)
            {
            Debug.Log(numberOfplayer2Prefabs);
                if(Time.time >= checkTimerplayer2) //if the current time elapsed is equal to or greater than the timer
                {
                    myPrevTrans = player2prefabs[numberOfplayer2Prefabs - 1];
                    checkTimerplayer2 = Time.time + spawnTimeplayer2; //set the timer again
                    numberOfplayer2Prefabs++;   
                   
                    myNewTrans = PhotonNetwork.Instantiate(playerChoice, myPrevTrans.transform.position, myPrevTrans.transform.rotation, 0);
                    myNewTrans.tag = "Blue";
                    myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer2Prefabs;
                    player2prefabs[numberOfplayer2Prefabs - 1] = myNewTrans;
                }
            }
            if(fruitGrab){//IF FRUIT IS BUGGY ITS CAUSE THIS CODE IS SHITTY
             if(Time.time>=endFruitTime2){
                 for(i = 0; i<numberOfplayer2Prefabs; i++){
                     player2prefabs[i].GetComponent(PlayerController).grabbedFruit = false;
                 }
                 fruitGrab=false;
             }
             else{
                 for(i = 0; i<numberOfplayer2Prefabs; i++){
                     player2prefabs[i].GetComponent(PlayerController).grabbedFruit = true;
                 }
             }
             }
        }
        
        }
    
}


