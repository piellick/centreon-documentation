---
id: applications-antivirus-kaspersky-snmp
title: Kaspersky
---

## Overview

Kasperky is a cybersecurity and anti-virus provider founded in 1997 by Eugene
Kaspersky, Natalya Kaspersky and Alexey De-Monderik.

## Plugin-Pack assests

### Monitored objects

* Kaspersky Security Center

### Collected Metrics

The following metrics are collected by the Centreon Kaspersky Plugin:

<!--DOCUSAURUS_CODE_TABS-->

<!--Deployment-->

| Metric name            | Description                                 |
| :----------------------| :-------------------------------------------| 
| progress               | Number of remote installations in progress  |     
| failed                 | Number of failed remote installations       |          
| expiring               | Number of hosts with expiring licence       |        
| expired                | Number of hosts with expired licence        |

<!--Events-->

| Metric name            | Description             |
| :----------------------| :-----------------------| 
| events                 | Number of events        |     

<!--Logical-Network-->

| Metric name               | Description                                            |
| :-------------------------| :------------------------------------------------------| 
| new_hosts                 | Number of new hosts                                    |     
| groups                    | Number of groups on the server                         |          
| not_connected_long_time   | Number of hosts that have not connected in a long time |        
| not_controlled            | Number of uncontrolled hosts                           |

<!--Protection-->

| Metric name            | Description                                           |
| :----------------------| :-----------------------------------------------------| 
| no_antivirus           | Number of hosts without running antivirus             |     
| no_real_time           | Number of hosts without running real time protection  |          
| not_acceptable_level   | Number of hosts with unacceptable protection level    |
| not_curred_objects     | Number of hosts with not curred objects               |
| too_many_threat        | Number of hosts with too many threats                 |

<!--Updates-->

| Metric name            | Description                             | Unit   |
| :----------------------| :---------------------------------------|:------ | 
| last_server_update     | Date of the last server update          | s      |    
| not_updated            | Number of failed remote installation    | string |        

<!--Full-Scan-->

| Metric name            | Description                                |
| :----------------------| :------------------------------------------| 
| not_scanned            | Number of hosts not recently scanned       |

<!--END_DOCUSAURUS_CODE_TABS-->

## Prerequisites

### Kasperky Security Center configuration

To use this pack, the SNMP service must be properly configured on your 
Kaspersky Security center server. Kaspersky provides an official documentation
to achieve this: https://support.kaspersky.com/12603#block3

### Network flow

The target server must be reachable from the Centreon Poller on the UDP/161 SNMP port.

## Installation

<!--DOCUSAURUS_CODE_TABS-->

<!--Online IMP Licence & IT-100 Editions-->

1. Install the Centreon Kaspersky Plugin package on every Centreon poller expected to monitor a Kaspersky Security Center:

```bash
yum install centreon-plugin-Applications-Antivirus-Kaspersky-Snmp
```

2. On the centreon Web interface, install the *Kaspersky* Centreon Plugin-Pack on the "Configuration > Plugin Packs > Manager" page

<!--Offline IMP License-->

1. Install the Centreon Kaspersky Plugin package on every Centreon poller expected to monitor a Kaspersky Security Center:

```bash
yum install centreon-plugin-Applications-Antivirus-Kaspersky-Snmp
```

2. Install the Centreon Plugin-Pack RPM on the Centreon Central server:

```bash
yum install centreon-pack-applications-antivirus-kaspersky-snmp
```

3. On the Centreon Web interface, install the *Kaspersky* Centreon Plugin-Pack on the "Configuration > Plugin Packs > Manager" page

<!--END_DOCUSAURUS_CODE_TABS-->

## Configuration

### Create a host using the appropriate template

Go to *Configuration* > *Host* > and click *Add*. Then fill the *SNMP Community*
and *SNMP Version* fields and apply the template 
*App-Antivirus-Kaspersky-SNMP-custom*.

If you are using SNMP Version 3, use the
*SNMPEXTRAOPTIONS* macro to configure your own SNMPv3 credentials combo.

| Mandatory   | Name             | Description                                    |
| :---------- | :--------------- | :--------------------------------------------- |
|             | SNMPEXTRAOPTIONS | Configure your own SNMPv3 credentials combo    |

## FAQ

### How do I run my plugin through the CLI and what do the main parameters stand for ?

Once you've installed the plugin, you can test it logging with *centreon-engine* user:
 
```bash
/usr/lib/centreon/plugins//centreon_kaspersky_snmp.pl \
  --plugin=apps::antivirus::kaspersky::snmp::plugin \
  --mode=deployment --hostname=10.30.2.15 \
  --snmp-version='2c' \
  --snmp-community='netsec/hqavscckaspersky'
```

Expected command output is shown below:

```
OK: status : skipped (no value(s)) - Deployment progress: 4743/4844 (97.91%) - 4 failed remote installation(s) - 137 host(s) with expiring licence - 4 host(s) with expired licence | 'progress'=4743;;;0;4844 'failed'=4;;;0; 'expiring'=137;;;0; 'expired'=4;;;0;
```

All available modes with the plugin can be displayed with:

```bash
/usr/lib/centreon/plugins//centreon_kaspersky_snmp.pl \
  --plugin=apps::antivirus::kaspersky::snmp::plugin \
  --list-mode
```

The available options for a mode can be displayed using the ```--help``` parameter:

```bash
/usr/lib/centreon/plugins//centreon_kaspersky_snmp.pl \
  --plugin=apps::antivirus::kaspersky::snmp::plugin \
  --mode=deployment \
  --help
```

### UNKNOWN: SNMP GET Request : Timeout

If you get this message, you're probably facing one of theses issues:

* Your SNMP server isn't started or misconfigured
* An external device is blocking your request (firewall, ...)

### UNKNOWN: SNMP GET Request : Cant get a single value.

This message generally means that SNMP privileges are not wide enough for the
mode/plugin to work properly.
