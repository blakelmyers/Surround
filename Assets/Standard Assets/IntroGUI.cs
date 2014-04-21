using UnityEngine;
using System.Collections;

public class IntroGUI : MonoBehaviour {

	private bool introGui = true;
	public GUIStyle style;

	private Texture btnTexture;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnGUI () {
		Debug.Log (introGui);
		if(introGui)
		{
			Rect rectangle = new Rect(20, (Screen.height/3), Screen.width, Screen.height);
			GUILayout.BeginArea (rectangle);
			GUILayout.Label("In a world only big enough for one dinosaur herd....", style);
			if(GUILayout.Button ("Continue to Tutorial"))
			{
				introGui = false;
				Application.LoadLevel("TutorialScene");
			}
			GUILayout.EndArea ();
		}
		Rect rectangle2 = new Rect(10,10,100,100);
		string text1 = "Skip To Menu";
		if (GUI.Button(rectangle2, text1))
		{
			introGui = false;
			Application.LoadLevel("MainMenu");
		}

	}
}
