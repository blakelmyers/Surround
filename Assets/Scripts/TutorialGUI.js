#pragma strict

var style : GUIStyle;
var style2 : GUIStyle;

public var spawnScript : SpawnscriptTest;

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

var cameraTransform : Transform;
var cameraPosition : Vector3;

private var checkTimer : float;

function Start () {
    step1 = true;
    cameraPosition = Vector3(500, 1600, -160);
    cameraTransform.position = cameraPosition;
    
    spawnScript = GameObject.Find("Spawnscript").GetComponent.<SpawnscriptTest>();
}

function OnGUI () {

    GUILayout.BeginVertical();
    if(GUILayout.Button("Return to Main Menu"))
    {
        Application.LoadLevel("MainMenu");
    }
    GUILayout.EndVertical();
    
    if(step1)
    {
        cameraPosition = Vector3(630, 1311, -30);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect((Screen.width/2)-150, (Screen.height/2) - 50, 300, 300));
        GUILayout.Label("Welcome to the Surround Tutorial !", style);
        if(GUILayout.Button ("Continue"))
        {
            step1 = false;
            step2 = true;
        }
        GUILayout.EndArea ();
    }
    if(step1a)
    {
        GUILayout.BeginArea (Rect((Screen.width/2)-150, (Screen.height/2) - 150, 300, 300));
        GUILayout.Label("Surround is a casual Real-Time Strategy game where each player controls a group of animals. The goal is to surround the opponent’s animals and eat them. The players are playing against each other in real-time and so in order to win, each player must out maneuver the opponent by using strategy and their wits.", style2);
        if(GUILayout.Button ("Continue"))
        {
            step1a = false;
            step2 = true;
        }
        GUILayout.EndArea ();
    }
    if(step2)
    {
        cameraPosition = Vector3(823, 600, 525);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("This is your dinosaur and base", style);
        if(GUILayout.Button ("Continue"))
        {
            step2 = false;
            step3 = true;
        }
        GUILayout.EndArea ();
    }
    if(step3)
    {
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("The dinosaur loves to follow your mouse.  Use the right mouse button to toogle movement on and off", style2);
        if(GUILayout.Button ("Continue"))
        {
            step3 = false;
            step5 = true;
            spawnScript.StartSpawning();
        }
        GUILayout.EndArea ();
    }
    if(step5)
    {
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("The Space bar give you a speed boost and increases your health while speed is active", style2);
        if(GUILayout.Button ("Continue"))
        {
            step5 = false;
            step5_1 = true;     
        }
        GUILayout.EndArea ();
    }   
    if(step5_1)
    {
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("In the upper right of the screen is your current Player Type and Spawn data.  In the lower left are two icons.  When the speed boost is available you will see the arrows. Left clicking locks your units in formation, indicated by the lock icon", style2);
        if(GUILayout.Button ("Continue"))
        {
            step5_1 = false;
            step6 = true;
        }
        GUILayout.EndArea ();
    }
    if(step6)
    {
        cameraPosition = Vector3(630, 1311, -30);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("Head toward the cave in the upper left", style2);
        GUILayout.EndArea ();
    }
    if(step5b)
    {
        cameraPosition = Vector3(630, 1311, -30);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("The fruit increased your size.", style2);
        GUILayout.EndArea ();
    }
    if(step7)
    {
        cameraPosition = Vector3(630, 675, 670);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect(400, 20, 200, 200));
        GUILayout.Label("The Sand slows your speed! Touch the empty cave to gain control", style2);
        GUILayout.EndArea ();
    }
    if(step8)
    {
        cameraPosition = Vector3(400, 688, 925);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect(400, 20, 200, 200));
        GUILayout.Label("The cave turns yellow and extra units will spawn.  Now attack the enemy.  Now attack the enemy by running into them.", style2);
        GUILayout.EndArea ();
    }
    if(step9)
    {
        
        GUILayout.BeginArea (Rect(400, 20, 320, 300));
        GUILayout.Label("Notice the enemies size decrease. Keep colliding until the enemy is dead.  Touch the Blue Base to end the tutorial", style2);
        GUILayout.EndArea ();
    }
    if(step10)
    {
        GUILayout.Label("Tutorial Complete", style);
        if(GUILayout.Button ("Finish"))
        {
            step10 = false;
            Application.LoadLevel("MainMenu");
        }
        GUILayout.EndArea ();
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
        step5b = false;
        step5c = false;
        step6 = true;
    }
}

function OverSand()
{
    if(step6a)   // Only set this once
    {
        step6 = false;
        step6a = false;
        step7 = true;
    }
}

function HitEnemy() {

    
    if(step8a)   // Only set this once
    {
        step8 = false;
        step8a = false;
        step9 = true;
    }
}

function HitBase() {
    Debug.Log("base");
    if(step7a)   // Only set this once
    {
        step7 = false;
        step7a = false;
        step8 = true;
    }
}

function EnemyDied() {
    Debug.Log("enemydied");
    
    if(step9a)   // Only set this once
    {
        step9 = false;
        step9a = false;
        step10 = true;
    }
}
function Update() {
    
}