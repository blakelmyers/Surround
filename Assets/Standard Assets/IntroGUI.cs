using UnityEngine;
using System.Collections;

public class IntroGUI : MonoBehaviour {

	private bool introGui = true;
	public GUIStyle style;

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

		Rect rectangle1 = new Rect(0, 0, 100, 100);
		GUILayout.BeginArea (rectangle1);
		if(GUILayout.Button ("Skip"))
		{
			introGui = false;
			Application.LoadLevel("MainMenu");
		}
		GUILayout.EndArea ();
	}
}
