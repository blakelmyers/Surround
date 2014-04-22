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
public var cameraDistance : float;
public var spawnTimeplayer1 : float;
public var spawnTimeplayer2 : float;
public var absoluteMaxSpawnplayer1 : int = 5;
public var absoluteMaxSpawnplayer2 : int = 5;
public var maxSpawnplayer1 : int = 5;
public var maxSpawnplayer2 : int = 5;
public var startPositionplayer1 : Vector3;
public var startPositionplayer2 : Vector3;

public var playerType : int;

public var cave1 : CaveTrigger;
public var cave2 : CaveTrigger;
public var cave3 : CaveTrigger;
public var cave4 : CaveTrigger;
public var cave5 : CaveTrigger;

var player1prefabs : GameObject[];
var player2prefabs : GameObject[];

private var numberOfplayer1Prefabs : int = 1;
private var numberOfplayer2Prefabs : int = 1;
private var checkTimerplayer1: float;
private var checkTimerplayer2: float;
private var endFruitTime1: float;
private var endFruitTime2: float;
public var gameStarted : boolean = false;

private var fruitGrab: boolean = false;

public var playerWhoWon : int = 0;
private var playerChoice : String;

var PV: PhotonView;

public var playerID : int;

var styleRed : GUIStyle;
var styleBlue : GUIStyle;
var styleGreen : GUIStyle;
var styleGreenPre : GUIStyle;
var styleYellow : GUIStyle;
var stylePurple : GUIStyle;
var styleOrange : GUIStyle;
var styleRainbow : GUIStyle;

var styleToolBar: GUIStyle;
var styleLock : GUIStyle;
var styleSpeed : GUIStyle;
var styleSpeedOn : GUIStyle;
var styleSpeedOff: GUIStyle;
var styleLabel: GUIStyle;

var selectionType : SelectionChoice;
var connectionObject : GameObject;

var player1Base : GameObject;
var player2Base : GameObject;

var baseColor : Color;

var playerColor : String;

var styleGUI : GUIStyle;

var player1Color : int;

var player2Color : int;

var noBaseChange : boolean = false;

public var niceSound : AudioClip;

public var deadSound : AudioClip;

public var player1Caves : int = 0;

public var player2Caves : int = 0;

private var goalTime : float;
private var totalTime : float = 180.0; 
private var startTime : float;
var textTime : String;



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
    playerType = 0;
    PV = gameObject.GetComponent(PhotonView);
    player1prefabs = new GameObject[50];
    player2prefabs = new GameObject[50];
      
    selectionType = GameObject.Find("Selection").GetComponent(SelectionChoice);
    
    Debug.Log(selectionType.selectionValue);
    
    playerChoice = "YellowPrefab";
    
    switch(selectionType.GetComponent(SelectionChoice).selectionValue)
    {
    case DinosaurEnum.YellowTall:
        playerChoice = "YellowPrefab";
        baseColor = Color.yellow;
        playerColor = "Yellow";
        styleGUI = styleYellow;
        playerType = 3;
        break;
    case DinosaurEnum.RedTall:
        playerChoice = "RedPrefab";
        baseColor = Color.red;
        playerColor = "Red";
        styleGUI = styleRed;
        playerType = 1;
        break;
    case DinosaurEnum.PurpleFat:
        playerChoice = "PurplePrefab";
        baseColor = Color.magenta;
        playerColor = "Purple";
        styleGUI = stylePurple;
        playerType = 5;
        break;
    case DinosaurEnum.BlueFat:
        playerChoice = "BluePrefab";
        baseColor = Color.blue;
        playerColor = "Blue";
        styleGUI = styleBlue;
        playerType = 2;
        break;
    case DinosaurEnum.GreenFat:
        playerChoice = "GreenPrefab";
        baseColor = Color.green;
        playerColor = "Green";
        styleGUI = styleGreenPre;
        playerType = 6;
        break;
    case DinosaurEnum.OrangeTall:
        playerChoice = "OrangePrefab";
        noBaseChange = true;
        playerColor = "Orange";
        styleGUI = styleOrange;
        playerType = 4;
        break;
    }

    cave1 = GameObject.Find("Cave1Prefab").GetComponent.<CaveTrigger>();
    cave2 = GameObject.Find("Cave2Prefab").GetComponent.<CaveTrigger>();
    cave3 = GameObject.Find("Cave3Prefab").GetComponent.<CaveTrigger>();
    cave4 = GameObject.Find("Cave4Prefab").GetComponent.<CaveTrigger>();
    cave5 = GameObject.Find("Cave5Prefab").GetComponent.<CaveTrigger>();
}

function GetGameStarted()
{
    return gameStarted;
}

function StartSpawning()
{
    goalTime = Time.time + totalTime;

    player1Caves = 0;

    player2Caves  = 0;
 gameStarted = true;
    var startingCameraPosition : Vector3;
 playerID = PhotonNetwork.player.ID;
    //Debug.Log(playerID);
    
    if(playerID == 1){
        player1Color = selectionType.GetComponent(SelectionChoice).selectionValue;
        checkTimerplayer1 = Time.time + spawnTimeplayer1;
        startPositionplayer1 = Vector3(1450, 8, 560);
       
    //Instantiate a new object for this player, remember; the player1 is therefore the owner.
    //Debug.Log(playerChoice);
        myNewTrans = GameObject.Find(playerChoice+"(Clone)");
        myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer1Prefabs;
        player1prefabs[0] = myNewTrans;
       
        //if(!noBaseChange)player1Base.renderer.material.color = baseColor;
     }
    else if (playerID == 2)   // player2
    {
        player2Color = selectionType.GetComponent(SelectionChoice).selectionValue;
       
        checkTimerplayer2 = Time.time + spawnTimeplayer2;
        startPositionplayer2 = Vector3(450, 5, 1500);
      // Debug.Log("start spawngin");
    //Instantiate a new object for this player, remember; the player1 is therefore the owner.
        myNewTrans = GameObject.Find(playerChoice+"(Clone)");
        myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer2Prefabs;
       player2prefabs[0] = myNewTrans;
       
       //if(!noBaseChange)player2Base.renderer.material.color = baseColor;
       
        photonView.RPC("PlayerTwoColor", PhotonTargets.Others, playerColor);
    }
}


}

@RPC
function PlayerOneColor(playerTag : String)
{
    if(playerID == 2)
    {
        Debug.Log("Color1: " + playerTag);
        //player1Base.renderer.material.color = playerTag;
    }
}


@RPC
function PlayerTwoColor(playerTag : String)
{
    if(playerID == 1)
    {
        Debug.Log("Color2: " + playerTag);
        //player2Base.renderer.material.color = playerTag;
        photonView.RPC("PlayerOneColor", PhotonTargets.Others, baseColor);
    }
}

function UpdatePlayer1Max(unitsLeft : int, caveNumber : int)
{  
        var myNewTrans : GameObject;
        var myPrevTrans : GameObject;
        
      audio.PlayOneShot(niceSound);
        
      for(var i = 0; i < 3; ++i)
      {
          myPrevTrans = player1prefabs[numberOfplayer1Prefabs - 1];
          numberOfplayer1Prefabs++;
                           
          myNewTrans = PhotonNetwork.Instantiate(playerChoice, myPrevTrans.transform.position + Vector3(25, 0, 0), myPrevTrans.transform.rotation, 0);
          myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer1Prefabs;
          myNewTrans.GetComponent(PlayerController).movementActive = myPrevTrans.GetComponent(PlayerController).movementActive;
          myNewTrans.GetComponent(PlayerController).movementLock = myPrevTrans.GetComponent(PlayerController).movementLock;
          player1prefabs[numberOfplayer1Prefabs - 1] = myNewTrans;
      }
}

function UpdatePlayer2Max(unitsLeft : int, caveNumber : int)
{
        var myNewTrans : GameObject;
        var myPrevTrans : GameObject;
        
      audio.PlayOneShot(niceSound);
        
      for(var i = 0; i < 3; ++i)
      {
            Debug.Log(numberOfplayer2Prefabs);
          myPrevTrans = player2prefabs[numberOfplayer2Prefabs - 1];
          numberOfplayer2Prefabs++;
                           
          myNewTrans = PhotonNetwork.Instantiate(playerChoice, myPrevTrans.transform.position + Vector3(20, 0, 0), myPrevTrans.transform.rotation, 0);
          myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer2Prefabs;
          myNewTrans.GetComponent(PlayerController).movementActive = myPrevTrans.GetComponent(PlayerController).movementActive;
          myNewTrans.GetComponent(PlayerController).movementLock = myPrevTrans.GetComponent(PlayerController).movementLock;
          player2prefabs[numberOfplayer2Prefabs - 1] = myNewTrans;
      }
}

function PickedUpFruit(){
if(playerID == 1){
    for(var i = 0; i < numberOfplayer1Prefabs; ++i)
    {
        player1prefabs[i].GetComponent(PlayerController).fruitBombs += 1;
        Debug.Log("bombs");
        Debug.Log(player1prefabs[i].GetComponent(PlayerController).fruitBombs);
        player1prefabs[i].GetComponent(PlayerController).pickedUpFruit = true;
    }
}
else if (playerID == 2)   // player2
{
    for(var j = 0; j < numberOfplayer2Prefabs; ++j)
    {
        player2prefabs[j].GetComponent(PlayerController).fruitBombs += 1;
        player2prefabs[j].GetComponent(PlayerController).pickedUpFruit = true;
    }
}
}

function UnitDied(unitNumber : int)
{

    
    if(playerID == 1)
    {
        audio.PlayOneShot(deadSound);
        for (var i = unitNumber; i < numberOfplayer1Prefabs; ++i)
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
           playerWhoWon = 2;
           photonView.RPC("PlayerWon", PhotonTargets.Others, playerWhoWon);
        }
        
       
        
    }
    else //player2
    {
        audio.PlayOneShot(deadSound);
        for (var j = unitNumber; j < numberOfplayer2Prefabs; ++j)
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
           playerWhoWon = 1;
           photonView.RPC("PlayerWon", PhotonTargets.Others, playerWhoWon);
        }
    }
    
}
//info : PhotonMessageInfo,
@RPC
function PlayerWon( playerNumber : int)
{
    Debug.Log("PlayerWon");
   // if(info.sender.ID != PhotonNetwork.player.ID)
    //{
        SetPlayerWhoWon(playerNumber);
   // }   

}
    
function SetPlayerWhoWon(playerNumber : int)
{
    Debug.Log("player who won is ");
    Debug.Log(playerWhoWon);
    playerWhoWon = playerNumber;
}

function OnGUI()
{
    if(gameStarted)
    {
        if(Time.time < goalTime)
        {
            guiTime = goalTime - Time.time; // You probably want to clamp this value to be between the totalTime and zero
     
           minutes  = guiTime / 60;
           seconds  = guiTime % 60;
         
           textTime = String.Format ("{0:00}:{1:00}", minutes, seconds); 
           GUI.Box (Rect(Screen.width/2 - 50, 0, 100, 30), "", styleToolBar);
           GUI.Label (Rect (Screen.width/2 - 50, 0, 100, 30), textTime, styleLabel); //changed variable name to textTime -->text is not a good variable name since it has other use already
        }
        else   // game over determine winner
        {
            var countCaves : int = 0;
           if(playerType == cave1.caveInt) ++countCaves;
           if(playerType == cave2.caveInt) ++countCaves;
           if(playerType == cave3.caveInt) ++countCaves;
           if(playerType == cave4.caveInt) ++countCaves;
           if(playerType == cave5.caveInt) ++countCaves;
           
           if(countCaves > 2)
           {
                if(playerID == 1)
                {
                    playerWhoWon =1;
                 }
                 else{
                    playerWhoWon =2;
                 }
               photonView.RPC("PlayerWon", PhotonTargets.Others, playerWhoWon);
           }
        }
        
    if(playerID == 1)
    { 
        
        /*GUILayout.BeginArea (Rect (Screen.width - 200,0,200,200));
        //GUILayout.Label(playerColor + " Player", styleGUI);
        GUILayout.Label("Total Units:   " + absoluteMaxSpawnplayer1.ToString(), styleGUI);
        //GUILayout.Label("Spawn Limit:   " + maxSpawnplayer1.ToString(), styleGUI);
        //GUILayout.Label("Current Spawn: " + numberOfplayer1Prefabs.ToString(), styleGUI);
        GUILayout.EndArea ();*/
        GUI.Box (Rect(0, Screen.height - 70, Screen.width, 70), "", styleToolBar);
        GUI.Box (Rect(50, Screen.height - 70, 100, 70), "DINOWARS!", styleLabel);
        GUI.Label(Rect (Screen.width - 200,Screen.height - 70,200,70), "Herd Size\n " + numberOfplayer1Prefabs.ToString(), styleGUI);
        // Player 1 won
        if(playerWhoWon == 1)
        {
        	
            GUILayout.BeginArea (Rect((Screen.width/2)-150, (Screen.height/2) - 50, 300, 300));
            GUILayout.Label("You WON!!!", styleGUI);
            if(GUILayout.Button ("Enjoy the dancing dinosaurs"))
            {
                Application.LoadLevel("WinnerScene");
            }
            GUILayout.EndArea ();
        }
        if(playerWhoWon == 2)
        {
            GUILayout.BeginArea (Rect((Screen.width/2)-150, (Screen.height/2) - 50, 300, 300));
            GUILayout.Label("You LOSE!!!", styleGUI);
            if(GUILayout.Button ("You need some training"))
            {
                Application.LoadLevel("TutorialScene");
            }
            GUILayout.EndArea ();
        }
        
        if(player1prefabs[0] != 0)
        { 
            if(player1prefabs[0].GetComponent(PlayerController).movementLock)
            {             
                GUI.Box (Rect (Screen.width/2+35,Screen.height - 70,70,70), "", styleLock);
            }
            if(!(player1prefabs[0].GetComponent(PlayerController).speedAvailable))
            {
            	GUI.Box (Rect (Screen.width/2-35,Screen.height - 70,70,70), "", styleSpeedOff);
            }
            if(player1prefabs[0].GetComponent(PlayerController).speedAvailable)
            {             
                GUI.Box (Rect (Screen.width/2-35,Screen.height - 70,70,70), "", styleSpeed);
            }
            if(player1prefabs[0].GetComponent(PlayerController).speedActive)
            {             
                GUI.Box (Rect (Screen.width/2-35,Screen.height - 70,70,70), "", styleSpeedOn);
            }
           	GUI.Box (Rect (Screen.width/2-35*3,Screen.height - 70,70,70), player1prefabs[0].GetComponent(PlayerController).fruitBombs.ToString(), styleRainbow);
            
        }
    }
    else{
        
        
    	
    	
        /*GUILayout.BeginArea (Rect (Screen.width - 200,0,200,200));
       // GUILayout.Label(playerColor + " Player", styleGUI);
 
       // GUILayout.Label("Spawn Limit:   " + maxSpawnplayer2.ToString(), styleGUI);
        //GUILayout.Label("Current Spawn: " + , styleGUI);
        GUILayout.EndArea ();*/
		GUI.Box (Rect(0, Screen.height - 70, Screen.width, 70), "", styleToolBar);
        GUI.Box (Rect(50, Screen.height - 70, 100, 70), "DINOWARS!", styleLabel);
        GUI.Label(Rect (Screen.width - 200,Screen.height - 70,200,70), "Herd Size\n " + numberOfplayer2Prefabs.ToString(), styleGUI);
            
    
         // Player 1 won
        if(playerWhoWon == 2)
        {
            GUILayout.BeginArea (Rect((Screen.width/2)-150, (Screen.height/2) - 50, 300, 300));
            GUILayout.Label("You WON!!!", styleGUI);
            if(GUILayout.Button ("Enjoy the dancing dinosaurs"))
            {
                Application.LoadLevel("WinnerScene");
            }
            GUILayout.EndArea ();
        }
        if(playerWhoWon == 1)
        {
            GUILayout.BeginArea (Rect((Screen.width/2)-150, (Screen.height/2) - 50, 300, 300));
            GUILayout.Label("You LOSE!!!", styleGUI);
            if(GUILayout.Button ("You need some training"))
            {
                Application.LoadLevel("TutorialScene");
            }
            GUILayout.EndArea ();
        }
        
        if(player2prefabs[0].GetComponent(PlayerController).movementLock)
        	{             
                GUI.Box (Rect (25,Screen.height - 100,70,70), "", styleLock);
            }
            if(!(player2prefabs[0].GetComponent(PlayerController).speedAvailable))
            {
            	GUI.Box (Rect (Screen.width/2-35,Screen.height - 70,70,70), "", styleSpeedOff);
            }
            if(player2prefabs[0].GetComponent(PlayerController).speedAvailable)
            {             
                GUI.Box (Rect (Screen.width/2-35,Screen.height - 70,70,70), "", styleSpeed);
            }
            if(player2prefabs[0].GetComponent(PlayerController).speedActive)
            {             
                GUI.Box (Rect (Screen.width/2-35,Screen.height - 70,70,70), "", styleSpeedOn);
            }
           	GUI.Box (Rect (Screen.width/2-35*3,Screen.height - 70,70,70), player2prefabs[0].GetComponent(PlayerController).fruitBombs.ToString(), styleRainbow);
       } 
    }
}

function Update()
{

    Debug.Log("player1 caves " + player1Caves.ToString());
    
    Debug.Log("player2 caves " + player2Caves.ToString());
    
    if((playerType == cave1.caveInt) &&
       (playerType == cave2.caveInt) &&
       (playerType == cave3.caveInt) &&
       (playerType == cave4.caveInt) &&
       (playerType == cave5.caveInt))
    {
        if(playerID == 1)
        {
            playerWhoWon =1;
         }
         else{
            playerWhoWon =2;
         }
       photonView.RPC("PlayerWon", PhotonTargets.Others, playerWhoWon);
    }
    if(numberOfplayer1Prefabs ==0){
    	playerWhoWon = 2;
       	photonView.RPC("PlayerWon", PhotonTargets.Others, playerWhoWon);
    }
    if(numberOfplayer2Prefabs ==0){
    	playerWhoWon = 1;
       	photonView.RPC("PlayerWon", PhotonTargets.Others, playerWhoWon);
    }
	/*
    if(Time.time > goalTime)
    {
        playerWhoWon = 1;
    }
 
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
                        //myNewTrans.tag = "Red";
                        Debug.Log(myNewTrans.tag);
                        myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer1Prefabs;
                        myNewTrans.GetComponent(PlayerController).movementActive = myPrevTrans.GetComponent(PlayerController).movementActive;
                        myNewTrans.GetComponent(PlayerController).movementLock = myPrevTrans.GetComponent(PlayerController).movementLock;
                        player1prefabs[numberOfplayer1Prefabs - 1] = myNewTrans;
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
                    //myNewTrans.tag = "Blue";
                     Debug.Log(myNewTrans.tag);
                    myNewTrans.GetComponent(PlayerController).spawnNumber = numberOfplayer2Prefabs;
                    myNewTrans.GetComponent(PlayerController).movementActive = myPrevTrans.GetComponent(PlayerController).movementActive;
                     myNewTrans.GetComponent(PlayerController).movementLock = myPrevTrans.GetComponent(PlayerController).movementLock;
                    player2prefabs[numberOfplayer2Prefabs - 1] = myNewTrans;
                }
            }
            
        }
        
        
    */
}

function sizeChange1()
{
	    for(var i = 0; i < numberOfplayer1Prefabs; ++i)
	    {
	        player1prefabs[i].GetComponent(PlayerController).changeSize(1.3);
            player1prefabs[i].GetComponent(PlayerController).healthMax_ += 3;
	    }
         
}

function sizeChange2()
{
        for(var j = 0; j < numberOfplayer2Prefabs; ++j)
        {
            player2prefabs[j].GetComponent(PlayerController).changeSize(1.3);
            player2prefabs[j].GetComponent(PlayerController).healthMax_ += 3;
        }
}

function sizeDecrease1()
{
    Debug.Log("Decrease size1");
        for(var i = 0; i < numberOfplayer1Prefabs; ++i)
        {
            player1prefabs[i].GetComponent(PlayerController).changeSize(0.7);
            player1prefabs[i].GetComponent(PlayerController).healthMax_ -= 3;
        }
         
}

function sizeDecrease2()
{
Debug.Log("Decrease size2");
        for(var j = 0; j < numberOfplayer2Prefabs; ++j)
        {
            player2prefabs[j].GetComponent(PlayerController).changeSize(0.7);
            player2prefabs[j].GetComponent(PlayerController).healthMax_ -= 3;
        }
}

function OnPhotonSerializeView(stream : PhotonStream, info : PhotonMessageInfo)
{
    //if(gameStarted == true)
    //{
        if (stream.isWriting)
        {
            Debug.Log("writting data spawn");
            if(playerID == 1)
            {   
                //stream.SendNext(player1Color);
                stream.SendNext(numberOfplayer1Prefabs);
            }
            else if(playerID == 2)
            {
                //stream.SendNext(player2Color);
                stream.SendNext(numberOfplayer2Prefabs);
            }

        }
        else
        {
            Debug.Log("getting data spawn");
            if(playerID == 1)
            {   
                //player2Color = stream.ReceiveNext();
               // Debug.Log("Enemy is " + player2Color);
                numberOfplayer2Prefabs = stream.ReceiveNext();
                Debug.Log("Enemy Units: " + numberOfplayer2Prefabs);
            }
            else if(playerID == 2)
            {
                //player1Color = stream.ReceiveNext();
                //Debug.Log("Enemy is " + player1Color);
                numberOfplayer1Prefabs = stream.ReceiveNext();
                Debug.Log("Enemy Units: " + numberOfplayer1Prefabs);
            }
             
        }
   // }
}



