
function OnTriggerEnter(collisionInfo : Collider){
	if(collisionInfo.name != this.name){
		if((collisionInfo.tag == "Red" && this.tag == "Blue") || (collisionInfo.tag == "Blue" && this.tag == "Red")){
			Destroy(this.gameObject);
		}
	}
}