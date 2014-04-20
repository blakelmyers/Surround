#pragma strict

var style : GUIStyle;
var style2 : GUIStyle;
var buttonStyle: GUIStyle;
var mouseStyle: GUIStyle;
var arrowLeftStyle: GUIStyle;
var instructionBarStyle: GUIStyle;
var mouseRight: GUIStyle;
var mouseMid: GUIStyle;
var mouseLeft: GUIStyle;
var speedOn:GUIStyle;
var speedAvailable: GUIStyle;
var speedOff:GUIStyle;
var speedLabel: GUIStyle;
var pooperFruit: GUIStyle;
public var spawnScript : SpawnscriptTest;

public var playerScript : PlayerControllerTest;

public var fruitScript : FruitTriggerTest;

private var step1 : boolean = false;
private var step1a : boolean = false;
private var step2 : boolean = false;
private var step3 : boolean = false;
private var step4 : boolean = false;
private var step5 : boolean = false;
private var step5a : boolean = true;
private var step5_1 : boolean = false;
private var step5b : boolean = false;
private var step5c : boolean = true;
private var step6 : boolean = false;
private var step6a : boolean = true;
private var step7 : boolean = false;
private var step7a : boolean = true;
private var step8 : boolean = false;
private var step8a : boolean = true;
private var step9 : boolean = false;
private var step9a : boolean = true;
private var step10 : boolean = false;

enum tutorialSteps{
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step7a,
    Step7b,
    Step8,
    Step9,
    Step10
}

public var stepState : tutorialSteps;

var cameraTransform : Transform;
var cameraPosition : Vector3;

private var checkTimer : float;

function Start () {
    stepState = tutorialSteps.Step1;
    cameraPosition = Vector3(500, 1600, -160);
    cameraTransform.position = cameraPosition;
    
    spawnScript = GameObject.Find("Spawnscript").GetComponent.<SpawnscriptTest>();
    
    playerScript = GameObject.Find("TutorialPrefabTest1").GetComponent.<PlayerControllerTest>();
    
    fruitScript = GameObject.Find("RainbowFruitTest").GetComponent.<FruitTriggerTest>();
}

function OnGUI () {

    GUILayout.BeginVertical();
    if(GUILayout.Button("Return to Main Menu"))
    {
        Application.LoadLevel("MainMenu");
    }
    GUILayout.EndVertical();
    
    switch(stepState)
    {
    case tutorialSteps.Step1:
        cameraPosition = Vector3(630, 1311, -30);
        cameraTransform.position = cameraPosition;
        GUI.Label(Rect(Screen.width/2-125,Screen.height/2-70,300,70), "Welcome to DinoWorld!", style);
        if(GUI.Button(Rect(Screen.width/2-125,Screen.height/2,300,100), "Click here Continue", buttonStyle)){
            spawnScript.StartSpawning();
            stepState = tutorialSteps.Step2;
            playerScript.movementActive = true;
        }
        break;
   case tutorialSteps.Step2:
        cameraPosition = Vector3(700, 1000, 225);
        cameraTransform.position = cameraPosition;
        GUI.Box(Rect(Screen.width - 150, 0, 150, Screen.height),"", instructionBarStyle);
        GUI.Label(Rect(Screen.width - 150, 0, 150, 150),"These are the yellow girnosaurus, and they are trying to survive in the wild!", style2);
        if(GUI.Button(Rect(Screen.width - 150, 150, 150, 150),"Continue", buttonStyle)){
        	stepState = tutorialSteps.Step3;
        }
        break;
    case tutorialSteps.Step3:
    	GUI.Box(Rect(Screen.width - 150, 0, 150, Screen.height),"", instructionBarStyle);
        GUI.Label(Rect(Screen.width - 150, 0, 150, 150),"Its your job to help the girnosauruses survive", style2);
        if(GUI.Button(Rect(Screen.width - 150, 150, 150, 150),"Continue", buttonStyle)){
        	stepState = tutorialSteps.Step4;
        }
        break;
    case tutorialSteps.Step4:
    	GUI.Box(Rect(Screen.width - 150, 0, 150, Screen.height),"", instructionBarStyle);
        GUI.Label(Rect(Screen.width - 150, 0, 150, 150),"You can help the dinos by using the mouse! \n The right mouse button gives your dinos a shot of dino-drenaline! \n[right click]", style2);
        GUI.Label(Rect(Screen.width - 100, 250, 50, 75), "", mouseRight);
        if(GUI.Button(Rect(Screen.width - 150, 325, 150, 50),"Continue", buttonStyle)){
        	stepState = tutorialSteps.Step5;
        }
    	break;
    case tutorialSteps.Step5:
    	GUI.Box(Rect(Screen.width - 150, 0, 150, Screen.height),"", instructionBarStyle);
        GUI.Label(Rect(Screen.width - 150, 0, 150, 150),"But your dinos can't take too much dino-drenaline...The lightning icon will indicate when your dinos are ready again.", style2);
        GUI.Label(Rect(Screen.width - 100, 225, 50, 25), "Speed Boost Active", speedLabel);
        GUI.Label(Rect(Screen.width - 100, 250, 50, 50), "", speedOn);
        GUI.Label(Rect(Screen.width - 100, 300, 50, 25), "Speed Boost Charged", speedLabel);
        GUI.Label(Rect(Screen.width - 100, 325, 50, 50), "", speedAvailable);
        GUI.Label(Rect(Screen.width - 100, 375, 50, 25), "Speed Boost Cooldown", speedLabel);
        GUI.Label(Rect(Screen.width - 100, 400, 50, 50), "", speedOff);
        if(GUI.Button(Rect(Screen.width - 150, Screen.height-120, 150, 50),"Continue", buttonStyle)){
        	stepState = tutorialSteps.Step6;
        }
        break;
     case tutorialSteps.Step6:
     	GUI.Box(Rect(Screen.width - 150, 0, 150, Screen.height),"", instructionBarStyle);
        GUI.Label(Rect(Screen.width - 150, 0, 150, 150),"The middle mouse button will lock your units into their current formation", style2);
        GUI.Label(Rect(Screen.width - 100, 250, 50, 75), "", mouseMid);
        if(GUI.Button(Rect(Screen.width - 150, Screen.height-120, 150, 50),"Continue", buttonStyle)){
        	stepState = tutorialSteps.Step7;
        	fruitScript.SpawnFruit();   
        }
    	break;
     case tutorialSteps.Step7:
    	GUI.Box(Rect(Screen.width - 150, 0, 150, Screen.height),"", instructionBarStyle);
        GUI.Label(Rect(Screen.width - 150, 0, 150, 150),"Throughout the wild, there are these magical rainbow-colored Pooper Fruits! Pick one up!", style2);
        GUI.Label(Rect(Screen.width - 100, 250, 50, 50), "", pooperFruit);
        if(fruitScript.pickedUpNumber == 1)
        {
            stepState = tutorialSteps.Step7a;
        }
        break;
    case tutorialSteps.Step7a:
    	GUI.Box(Rect(Screen.width - 150, 0, 150, Screen.height),"", instructionBarStyle);
        GUI.Label(Rect(Screen.width - 150, 0, 150, 150),"The pooper fruits will let leave little gifts behind when you click the left mouse button", style2);
        GUI.Label(Rect(Screen.width - 100, 250, 50, 50), "", mouseLeft);
        if(Input.GetMouseButtonDown(0))
        {
            stepState = tutorialSteps.Step7b;
        }
        break;
    case tutorialSteps.Step7b:
    	GUI.Box(Rect(Screen.width - 150, 0, 150, Screen.height),"", instructionBarStyle);
        GUI.Label(Rect(Screen.width - 150, 0, 150, 150),"These little gifts will allow you to mark your territory and if enemy dinos run into them they will get hurt", style2);
        if(GUI.Button(Rect(Screen.width - 150, Screen.height-120, 150, 50),"Continue", buttonStyle))
        {
            stepState = tutorialSteps.Step8;
        }
        break;
    case tutorialSteps.Step8:
        cameraPosition = Vector3(500, 1311, -30);
        cameraTransform.position = cameraPosition;
        GUI.Box(Rect(Screen.width - 150, 0, 150, Screen.height),"", instructionBarStyle);
        GUI.Label(Rect(Screen.width - 150, 0, 150, 150),"Sometimes the dinos want to expand their herd, and the only way to do that is to get more real-estate, conquer the cave near-by by running into it", style2);
        break;
    case tutorialSteps.Step9:
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("There are blue hippotigertaumus! Attack them!!!", style2);
        GUILayout.EndArea ();
        break;
    case tutorialSteps.Step10:
        cameraPosition = Vector3(400, 688, 925);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("Units shrink when they take damage.  Collide with the blue base end the tutorial and start conquering enemy dinosaurs", style2);
        GUILayout.EndArea ();
        break;
    default:
        break;
    }   
}

function OverBerries()
{
    if(step5a)   // Only set this once
    {
        step3 = false;
        step5a = false;
        step5 = true;
    }
}

function PickedUpOrange()
{
    if(step5c)   // Only set this once
    {
        step6 = false;
        step5c = false;
        step5b = true;
    }
}

function OverSand()
{
    if(step6a)   // Only set this once
    {
        step5b = false;
        step6a = false;
        step7 = true;
    }
}

function HitEnemy() {

    
    if(step8a)   // Only set this once
    {
        stepState = tutorialSteps.Step9;
        step8a = false;
       
    }
}

function HitBase() {
    Debug.Log("base");
    if(step7a)   // Only set this once
    {
        step7a = false;
        stepState = tutorialSteps.Step8;
    }
}

function EnemyDied() {
    Debug.Log("enemydied");
    
    if(step9a)   // Only set this once
    {
        step9 = false;
        step9a = false;
        //step10 = true;
    }
}
function Update() {
    
}