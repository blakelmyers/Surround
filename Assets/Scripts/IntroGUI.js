#pragma strict


enum storySteps{
	Step1,
	Step2,
	Step3,
	Step4,
	Step5,
	Step6,
	Step7
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
var meteor:GUIStyle;
var volcano:GUIStyle;
var plusSign:GUIStyle;
var deadDinos:GUIStyle;
var titleBackground:GUIStyle;

var step1Time:float;
var step2Time:float;
var step3Time:float;
var step4Time:float;
var step5Time:float;
var step6Time:float;
var step7Time:float;

function Start () {
	stepState = storySteps.Step1;
	step2Time = Time.time+10;
	step3Time = step2Time+10;
	step4Time = step3Time+10;
	step5Time = step4Time+10;
	step6Time = step5Time+10;
}

function Update () {
	if(Time.time>step2Time){
		stepState = storySteps.Step3;
	}
	if(Time.time>step3Time){
		stepState = storySteps.Step4;
	}
	if(Time.time>step4Time){
		stepState = storySteps.Step5;
	}
	if(Time.time>step5Time){
		stepState = storySteps.Step6;
	}
	if(Time.time>step6Time){
		stepState = storySteps.Step7;
	}
}

function OnGUI(){
			
			switch(stepState){
				case storySteps.Step1:
					GUI.Box(Rect(0,0, Screen.width, Screen.height),"", firstBackground);
					GUI.Label(Rect(0, 200, Screen.width, 100),"Welcome to Dino-Wars", titleStyle);
					if(GUI.Button (Rect(0, 300, Screen.width, 100),"Start",buttonStyle))
					{
						stepState = storySteps.Step2;
						step2Time = Time.time+10;
                        step3Time = step2Time+10;
                        step4Time = step3Time+10;
                        step5Time = step4Time+10;
                        step6Time = step5Time+10;
					}
					if (GUI.Button (Rect(0, 400, Screen.width, 100),"Skip to Main Menu",buttonStyle))
					{
						Application.LoadLevel("MainMenu");
					}
					break;
				case storySteps.Step2:
					GUI.Box(Rect(0,0, Screen.width, Screen.height),"", dinoEarth);
					GUI.Label(Rect(Screen.width-275, 10, 240, 200), "Long ago on Dino-Earth.\n There was peace and awesomeness...", textStyle);
					if (GUI.Button (Rect(10, 10, 150, 20),"Skip to Main Menu",smallButtonStyle))
					{
						Application.LoadLevel("MainMenu");
					}
					if(GUI.Button(Rect(Screen.width-275, 200, 240, 50), "Click here Continue", inButtonStyle)){
						stepState = storySteps.Step3;
					}
					break;
				case storySteps.Step3:
					GUI.Box(Rect(Screen.width/2,0, Screen.width/2, Screen.height),"", happyDinos);
					GUI.Label(Rect(0, Screen.height/3, Screen.width/2, 100), "Dino-herds of all different species lived in harmony \n Food and land was plentiful!", textStyle);
					if (GUI.Button (Rect(10, 10, 150, 20),"Skip to Main Menu",smallButtonStyle))
					{
						Application.LoadLevel("MainMenu");
					}
					if(GUI.Button(Rect(0, Screen.height/3+100, Screen.width/2, 50), "Click here Continue", inButtonStyle)){
						stepState = storySteps.Step4;
					}
					break;
				case storySteps.Step4:
					GUI.Label(Rect(0, Screen.height/5, Screen.width, 100), "But in the year 3000 B.D.C. (Before Dino Christ) \n\n Disaster struck as a super dino-volcano and a super dino-meteor struck Dino-Earth!", textStyle);
					GUI.Box(Rect(0, 300, 270, 210), "", volcano);
					GUI.Box(Rect(Screen.width/2-100, 300, 200, 200), "", plusSign);
					GUI.Box(Rect(Screen.width-270, 300, 270, 150), "", meteor);
					if(GUI.Button(Rect(0, Screen.height/5+100, Screen.width, 50), "Click here Continue", inButtonStyle)){
						stepState = storySteps.Step5;
					}
					if (GUI.Button (Rect(10, 10, 150, 20),"Skip to Main Menu",smallButtonStyle))
					{
						Application.LoadLevel("MainMenu");
					}
					break;
				case storySteps.Step5:
					GUI.Box(Rect(0, 0, Screen.width/2, Screen.height),"", deadDinos);
					GUI.Label(Rect(Screen.width/2,Screen.height/3, Screen.width/2, 100), "The land was scorched and many herds perished, but the remaining dinos fight on. Competing for precious fruits and land.", textStyle);
					if (GUI.Button (Rect(10, 10, 150, 20),"Skip to Main Menu",smallButtonStyle))
					{
						Application.LoadLevel("MainMenu");
					}
					if(GUI.Button(Rect(Screen.width/2, Screen.height/3+150, Screen.width/2, 50), "Click here Continue", inButtonStyle)){
						stepState = storySteps.Step6;
					}
					break;
				case storySteps.Step6:
					GUI.Label(Rect(0, 200, Screen.width, 100),"This...is....", textStyle);
					break;
				case storySteps.Step7: 
					GUI.Box(Rect(0,0,Screen.width,Screen.height),"",titleBackground);
					if(GUI.Button (Rect(0, 300, Screen.width, 100),"Play the Tutorial",buttonStyle)){
						Application.LoadLevel("TutorialScene");
					}
					if (GUI.Button (Rect(0, 400, Screen.width, 100),"Skip to Main Menu",buttonStyle))
					{
						Application.LoadLevel("MainMenu");
					}
					break;		
			}
			
}