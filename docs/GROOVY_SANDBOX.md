# Groovy sandbox compatibility

Crafter Studio plugin REST scripts and classes under `config/studio/scripts/classes/` run with the **Groovy sandbox** enabled by default (`studio.scripting.sandbox.enable: true`).

## Rules used by this plugin

1. **Bean lookup** — Use only `applicationContext.get('beanName')`. That maps to `ApplicationContextAccessor.get(String)`, which is on the Studio whitelist. Do **not** use `getBean`, `containsBean`, `WebApplicationContextUtils`, or `RequestContextHolder` in plugin code.

2. **JDBC** — Use Studio’s pooled `dataSource` bean and `groovy.sql.Sql` with **fully qualified** table names (`` `crafter-workflow`.wf_* ``).

3. **Logging** — Use `org.slf4j.LoggerFactory.getLogger` (whitelisted).

4. **SQL identifiers** — Never embed schema/table names with GString interpolation in strings passed to `groovy.sql.Sql` (e.g. `"FROM ${db.table('x')}"`). Groovy Sql converts GString values into JDBC `?` placeholders, which is valid for **values** but not **identifiers** (schema/table names). Use plain string concatenation: `'FROM ' + db.table('wf_workflow') + ' WHERE id = ?'`.

## Studio configuration

| Setting | Default | Plugin impact |
|--------|---------|----------------|
| `studio.scripting.sandbox.enable` | `true` | Sandbox + `SandboxTransformer` on scripts/classes |
| `studio.scripting.sandbox.whitelist.enable` | `false` | When `false`, only the **blacklist** applies; `groovy.sql` works without extra entries |
| `studio.scripting.restrictBeans` | `false` | When `true`, only beans matching `studio.scripting.allowedBeans` are returned by `applicationContext.get()` |

If **bean restriction** is enabled, add at least:

```yaml
studio.scripting.allowedBeans: dataSource,securityService,userService,contentService,cstudioContentService,studio.workflowService,publishService,cstudioServicesConfig,mailSender,mailSenderNoAuth,studioConfiguration
```

If **whitelist** is enabled (`studio.scripting.sandbox.whitelist.enable: true`), append the plugin fragment to the site whitelist file (same path as your Studio extension, often `config/studio/extension/groovy/whitelist`):

```bash
# From the plugin repo (after marketplace/copy)
cat authoring/config/studio/extension/groovy/crafterwf-plugin-whitelist.append >> \
  "$CRAFTER_DATA/repos/sites/<siteId>/sandbox/config/studio/extension/groovy/whitelist"
```

The install script merges this block automatically when that whitelist file exists (see `scripts/install-plugin.sh`).

Commit the site sandbox change in Studio so the whitelist reloads.

## Redeploy

```bash
SKIP_YARN_DIST=1 ./scripts/install-plugin.sh <siteId>
```

Then reload the site script engine in Studio (or restart authoring) if classes were cached.
