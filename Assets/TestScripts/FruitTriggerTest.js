#pragma strict

private var respawnTime : float = 3;  // 3 seconds

private var spawnTimer : float;

private var waitingToSpawn : boolean = false;

public var pickedUpNumber : int = 0;

function Start () {
    transform.renderer.enabled = false;
    transform.position.y = -200;
    
    Debug.Log("in fruit start");
}

function SpawnFruit() 
{
    waitingToSpawn = true;
}

function Update () {

    if(waitingToSpawn)
    {
        // check timer
        if(Time.time >= spawnTimer) 
        {
            transform.renderer.enabled = true;
            transform.position.y = 3;
            waitingToSpawn = false;
        }
    }
}

function OnTriggerEnter(other:Collider){

      if(!waitingToSpawn)
      {
          ++pickedUpNumber;
          Debug.Log(pickedUpNumber);
          transform.renderer.enabled = false;
          transform.position.y = -200;
          
          waitingToSpawn = true;
          spawnTimer = Time.time + respawnTime;
      }
        //Destroy(this.gameObject);
}
