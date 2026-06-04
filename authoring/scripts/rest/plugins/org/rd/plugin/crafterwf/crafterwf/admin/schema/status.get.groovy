import plugins.org.rd.plugin.crafterwf.WorkflowContext

def ctx = WorkflowContext.create(applicationContext, pluginConfig, false)
return ctx.adminService.getSchemaStatus()
