#pragma strict

var style : GUIStyle;
var style2 : GUIStyle;

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
    Step8,
    Step9
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
        GUILayout.BeginArea (Rect((Screen.width/2)-150, (Screen.height/2) - 50, 300, 300));
        GUILayout.Label("Welcome to the World of Surround", style);
        if(GUILayout.Button ("Continue"))
        {
            stepState = tutorialSteps.Step2;
            playerScript.movementActive = true;
            spawnScript.StartSpawning();
        }
        GUILayout.EndArea ();
        break;
   case tutorialSteps.Step2:
        cameraPosition = Vector3(1000, 800, 225);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("These are yellow girnosaurus.  They love to follow your mouse.", style2);
        if(GUILayout.Button ("Continue"))
        {
            stepState = tutorialSteps.Step3;
        }
        GUILayout.EndArea ();
        break;
    case tutorialSteps.Step3:
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("You can give you girnosaurus a speed boost by right clicking", style2);
        if(Input.GetMouseButtonDown(1))
        {
            stepState = tutorialSteps.Step4;
            
        }
        GUILayout.EndArea ();
        break;
    case tutorialSteps.Step4:
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("Notice the Arrow icon in the lower left.  This indicates whether you have a speed boost available", style2);
        if(GUILayout.Button ("Continue"))
        {
            stepState = tutorialSteps.Step5;     
        }
        GUILayout.EndArea ();
        break;
     case tutorialSteps.Step5:
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("The middle mouse button will lock your units in formation.", style2);
        if(Input.GetMouseButtonDown(2))
        {
            stepState = tutorialSteps.Step6; 
            fruitScript.SpawnFruit();    
        }
        GUILayout.EndArea ();
        break;
     case tutorialSteps.Step6:
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("When you pick up a fruit, you can poop by clicking the left mouse button.  The rainbow icon indicates you have the fruit power.  The poop will hurt your opponnent if they touch it!", style2);
        
        if(fruitScript.pickedUpNumber == 3)
        {
            stepState = tutorialSteps.Step7;
        }

        GUILayout.EndArea ();
        break;
    case tutorialSteps.Step7:
        cameraPosition = Vector3(630, 1311, -30);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("Touch the cave to gain more units", style2);
        GUILayout.EndArea ();
        break;
    case tutorialSteps.Step8:
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("There are blue hippotigertaumus! Attack them!!!", style2);
        GUILayout.EndArea ();
        break;
    case tutorialSteps.Step9:
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