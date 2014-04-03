#pragma strict

public var spawnScript : Spawnscript;

public class FruitTrigger extends Photon.MonoBehaviour{

	public var unitNumber : int;

	private var Cube : GameObject;

	public var unitsLeft : int;

	public var caveNumber : int;

	enum PlayerHit{
	    None,
	    Red,
	    Blue
	}

	public var fruitHitBy : PlayerHit;

	function Start () {
	     unitsLeft = 10;
	     
	     var t : Transform;
	     spawnScript = GameObject.Find("Spawnscript").GetComponent.<Spawnscript>();
	}

	function Update () {

	}

	function OnTriggerEnter(other:Collider){
	    // Only take control if you dont already have control
		if(other.tag == "Red"){
			Destroy(gameObject);
			spawnScript.fruitTimer(1);
		}
		if(other.tag == "Blue"){
			Destroy(gameObject);
			spawnScript.fruitTimer(2);
		}
	}
}