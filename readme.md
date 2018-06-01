# SpyFall

```
firebase:{
  rooms:{
    $id:{
      location_id (-1): -1 as preparation, other playing
      $playername: role_id (-1..location_length): -1 as spy, other normal
    }
  }
}

join room(id):
  update room ({name:-1}).then(
    redux update
    listen to room's location: !prep_room => block start key, loading, listen to my role change => enter
  )

start game:
  random room
  update room location
  get room players
  assign roles=>update


```

dependencies:
- next
- react
- redux
- firebase

references:
https://codepen.io/aurer/pen/jEGbA
https://github.com/scooter3/spyfall/