using UnityEngine;
using System.Collections;

public enum DinosaurEnum {
	YellowTall = 0,
	RedTall = 1,
	PurpleFat = 2,
	BlueFat = 3, 
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
