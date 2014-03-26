#pragma strict

public var unitNumber : GameObject;

public var firstDino : GameObject;
public var secondDino : Transform;

private var unitsLeft : int;

function Start () {
     unitsLeft = 1;
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
            Instantiate(secondDino, firstDino.transform.position, Quaternion.identity);
        }
        unitNumber.GetComponent(TextMesh).text = unitsLeft.ToString();
	}
	if(other.tag == "Blue"){
		renderer.material.color = Color.blue;
	}
}
