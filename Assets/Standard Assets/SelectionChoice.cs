using UnityEngine;
using System.Collections;

public enum DinosaurEnum {
	YellowTall = 0,
	OrangeTall = 1,
	RedTall = 2,
	PurpleFat = 3,
	BlueFat = 4,
	GreenFat = 5
}

public class SelectionChoice : MonoBehaviour {


	public DinosaurEnum selectionValue = DinosaurEnum.YellowTall;


	// Use this for initialization
	void Start () {
		DontDestroyOnLoad(this);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
}
