#pragma strict

var style : GUIStyle;
var style2 : GUIStyle;

private var step1 : boolean = false;
private var step2 : boolean = false;
private var step3 : boolean = false;
private var step4 : boolean = false;
private var step5 : boolean = false;
private var step5a : boolean = true;
private var step6 : boolean = false;
private var step6a : boolean = true;
private var step7 : boolean = false;
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
        GUILayout.BeginArea (Rect((Screen.width/2)-150, (Screen.height/2) - 50, 300, 300));
        GUILayout.Label("Welcome to the Surround Tutorial !", style);
        if(GUILayout.Button ("Continue"))
        {
            step1 = false;
            step2 = true;
        }
        GUILayout.EndArea ();
    }
    if(step2)
    {
        cameraPosition = Vector3(685, 675, 605);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("These are your dinosaurs and base", style);
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
        GUILayout.Label("To move your dinosaurs, click the right mouse button.", style);
        if(Input.GetMouseButtonDown(1))
        {
            step3 = false;
            step4 = true;
        }
        GUILayout.EndArea ();
    }
    if(step4)
    {
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("The dinosaurs will now follow the mouse. The Red circle below the dinosaur is the health indicator.  Right now his health is low.  Enter the base area to heal.", style2);
        GUILayout.EndArea ();
    }
    if(step5)
    {
        cameraPosition = Vector3(685, 675, 605);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("The Health is restored to Green", style);
        if(GUILayout.Button ("Continue"))
        {
            step5 = false;
            step6 = true;
        }
        GUILayout.EndArea ();
    }
    if(step6)
    {
        cameraPosition = Vector3(500, 1600, -160);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect(300, 20, 300, 300));
        GUILayout.Label("On the other end of the arena is the opponent.  Make your way over there.", style2);
        GUILayout.EndArea ();
    }
    if(step7)
    {
        GUILayout.BeginArea (Rect(400, 20, 200, 200));
        GUILayout.Label("The Sand slows your speed", style2);
        if(GUILayout.Button ("Continue"))
        {
            step7 = false;
            step8 = true;
        }
        GUILayout.EndArea ();
    }
    if(step8)
    {
        GUILayout.BeginArea (Rect(400, 20, 200, 200));
        GUILayout.Label("Attack the enemy unit by colliding with it", style2);
        GUILayout.EndArea ();
    }
    if(step9)
    {
        cameraPosition = Vector3(400, 600, 1030);
        cameraTransform.position = cameraPosition;
        GUILayout.BeginArea (Rect(400, 20, 320, 300));
        GUILayout.Label("Notice the enemies health decrease. Right click again to move the dinosaur and keep colliding until the enemy is dead", style2);
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
        step4 = false;
        step5a = false;
        step5 = true;
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

    // stop the follower prefab as well
    GameObject.Find("YellowPrefab1").GetComponent(TutorialPlayerController).movementActive = false;
    GameObject.Find("YellowPrefab2").GetComponent(TutorialPlayerController).movementActive = false;
    
    if(step8a)   // Only set this once
    {
        step8 = false;
        step8a = false;
        step9 = true;
    }
}

function EnemyDied() {
    Debug.Log("enemydied");
    Application.LoadLevel("MainMenu");
    if(step9a)   // Only set this once
    {
        step9 = false;
        step9a = false;
        step10 = true;
    }
}
function Update() {
    
}