#pragma strict

public var unitNumber : GameObject;


private var unitsLeft : int;

function Start () {
     unitsLeft = 10;
     unitNumber.GetComponent(TextMesh).text = unitsLeft.ToString();
}

function Update () {
	
}

function OnTriggerEnter(other:Collider){
	if(other.tag == "Red"){
		renderer.material.color = Color.red;
        if(unitsLeft > 0)
        {
            --unitsLeft;
        }
        unitNumber.GetComponent(TextMesh).text = unitsLeft.ToString();
	}
	if(other.tag == "Blue"){
		renderer.material.color = Color.blue;
        if(unitsLeft > 0)
        {
            --unitsLeft;
        }
        unitNumber.GetComponent(TextMesh).text = unitsLeft.ToString();
	}
}
