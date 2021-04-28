# _LinkedIn Scrapping_ ⛏️

![preview](./readme-assets/asset1)

## Note:

Don't close popup during scrapping neither change window. Also, when scrapping finishes you have to wait some seconds until a message with a button for sending info to database appears.

No cerrar el popup durante el scrapping ni cambiar la ventana o tab. Además, cuando el scrapping termine se debe esperar unos segundos hasta que aparezca un mensaje con toda la data extraída y un botón para enviarla a la base de datos en mongo.

### Todo

- [ ] Can download data in .csv or pdf
- [ ] Add button to erase div created
- [ ] Add dynamic selectors
- [ ] Group data by dates

### In Progress

- [ ] Improve code (Refactor some things)

### Done ✓

- [x] Can choose what type of contact do you want to scrap
- [x] Modify extension so it can send data to DB
- [x] Create API (https://github.com/dialguiba/scrapingExtApi)
- [x] Input for specific search
- [x] Scrap various profiles of one page
- [x] Scrap all pages
- [x] Scrap when is just one page

## ORIGINAL

### Extensión Google Chrome

Primer ejemplo de extensión en Google Chrome.

## manifest.json

Configurar el manifest.json de acuerdo al ejemplo:

```
{
    "name": "<You_name>",
    "description": "<You_description",
    "version": "1.0",
    "manifest_version": 3,
    "action": {
        "default_popup": "./App/index.html"
    },
    "permissions": [ "activeTab", "scripting" ]
}
```

Esta vez el ejemplo trata de un "scripting".
