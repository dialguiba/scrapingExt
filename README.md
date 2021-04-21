## _LinkedIn Scrapping_

### Todo

- [ ] Create API
- [ ] Send data to DB

### In Progress

- [ ] Scrap all pages

### Done ✓

- [x] Input for specific search
- [x] Scrap various profiles of one page

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
