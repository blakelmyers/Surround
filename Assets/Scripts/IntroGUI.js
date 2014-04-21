#pragma strict


enum storySteps{
	Step1,
	Step2,
	Step3,
	Step4,
	Step5,
	Step6,
}

public var stepState: storySteps;

var textStyle:GUIStyle;
var titleStyle: GUIStyle;
var buttonStyle: GUIStyle;
var smallButtonStyle:GUIStyle;
var inButtonStyle: GUIStyle;
var firstBackground:GUIStyle;
var dinoEarth:GUIStyle;
var happyDinos:GUIStyle;

function Start () {
	stepState = storySteps.Step1;
}

function Update () {

}

function OnGUI(){
			
			
			switch(stepState){
				case storySteps.Step1:
					GUI.Box(Rect(0,0, Screen.width, Screen.height),"", firstBackground);
					GUI.Label(Rect(0, 200, Screen.width, 100),"Welcome to Dino-Wars", titleStyle);
					if(GUI.Button (Rect(0, 300, Screen.width, 100),"Start",buttonStyle))
					{
						stepState = storySteps.Step2;
					}
					if (GUI.Button (Rect(0, 400, Screen.width, 100),"Skip to Main Menu",buttonStyle))
					{
						Application.LoadLevel("MainMenu");
					}
					break;
				case storySteps.Step2:
					GUI.Box(Rect(0,0, Screen.width, Screen.height),"", dinoEarth);
					GUI.Label(Rect(Screen.width-250, 0, 120, 100), "Long ago on Dino-Earth.\n There was peace and harmony...", textStyle);
					if (GUI.Button (Rect(10, 10, 150, 20),"Skip to Main Menu",smallButtonStyle))
					{
						Application.LoadLevel("MainMenu");
					}
					if(GUI.Button(Rect(Screen.width-250, 100, 120, 50), "Click here Continue", inButtonStyle)){
						stepState = storySteps.Step3;
					}
					break;
				case storySteps.Step3:
					GUI.Box(Rect(Screen.width/2,0, Screen.width/2, Screen.height),"", happyDinos);
					if (GUI.Button (Rect(10, 10, 150, 20),"Skip to Main Menu",smallButtonStyle))
					{
						Application.LoadLevel("MainMenu");
					}
					break;
				case storySteps.Step4:
					GUI.Box(Rect(0,0, Screen.width, Screen.height),"", happyDinos);
					if (GUI.Button (Rect(10, 10, 150, 20),"Skip to Main Menu",smallButtonStyle))
					{
						Application.LoadLevel("MainMenu");
					}
					break;
			}
			
}