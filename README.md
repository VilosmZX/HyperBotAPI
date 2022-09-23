# Disclaimer
This is a wa bot that is useful as an API for your frontend.
This API has cool features like:
* Auto reply
  * Add auto reply (/api/client/autoreply/add) 
    * Masukan data
     ```json
     {
       "trigger": "halo",
       "reply": "Hi"
     }
     ```
  * List semua autoreply yang ada (/api/client/autoreply/list)
    ```json
    [
      {
          "id": 1,
          "trigger": "/autoreply",
          "reply": "halo bro!",
          "createdAt": "2022-09-23T21:43:34.725Z",
          "updatedAt": "2022-09-23T21:43:34.725Z"
      }
    ]
    ```
  * Clear semua autoreply (/api/client/autoreply/clear)
  * Delete specific autoreply (/api/client/autoreply/delete?id=1)
* Info
  * Get information for all group (/api/client/chats)
  * Get information for specific group by JID (/api/client/chats/:jid)
* Chat Log
  * Get chat log for specifig group by JId (/api/client/logs/:jid)
  ```json
  [
    {
        "id": 1,
        "groupId": "120363022914653474@g.us",
        "pushname": "j",
        "conversation": "test",
        "fromMe": true,
        "countryCode": "62",
        "number": "6282113463302@s.whatsapp.net"
    },
    {
        "id": 2,
        "groupId": "120363022914653474@g.us",
        "pushname": "j",
        "conversation": "test",
        "fromMe": true,
        "countryCode": "62",
        "number": "6282113463302@s.whatsapp.net"
    },
    {
        "id": 3,
        "groupId": "120363022914653474@g.us",
        "pushname": "j",
        "conversation": "test",
        "fromMe": true,
        "countryCode": "62",
        "number": "6282113463302@s.whatsapp.net"
    }
  ]
  ```
* Send Message (/api/client/chats/:jid/send?msg=test)

Many more 

# Do this first
Install semua package
```
npm install
```
Migrate database
``` 
npm run migrate
```
Run production mode
```
npm run prod
```
Or
Run development mode
```
npm run dev
```

