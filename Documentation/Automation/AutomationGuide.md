# Automation Guide
## Creating of Files
### Main Template

**Windows**

```bash
# UNIX-like
tsx Automation/TemplatesGenerator.ts\
    functionality\
    '[ Route ]'\
    [ Directory ]\
    [ Output File Name Common Part ]
```

```powershell
# Windows
tsx Automation/TemplatesGenerator.ts `
    functionality `
    '[ Route ]' `
    [ Directory ] `
    [ Output File Name Common Part ]
```

For example, in

<dl>

  <dt>Route</dt>
  <dd><code>coreLibrary.$children.functionality.$children.AJAX.$children.AJAX_Service</code></dd>

  <dt>Directory</dt>
  <dd>CoreLibrary/Functionality/AJAX/AJAX_Service</dd>

  <dt>Output File Name Common Part<dt>
  <dd><code>AJAX_Service</code></dd>

</dl>

case it will be:

```bash
# UNIX-like
tsx Automation/TemplatesGenerator.ts\
    main\
    'coreLibrary.$children.functionality.$children.AJAX.$children.AJAX_Service'\
    CoreLibrary/Functionality/AJAX/AJAX_Service\
    AJAX_Service\
```

```powershell
# Windows
tsx Automation/TemplatesGenerator.ts `
    main `
    'coreLibrary.$children.functionality.$children.AJAX.$children.AJAX_Service' `
    CoreLibrary/Functionality/AJAX/AJAX_Service `
    AJAX_Service
```
