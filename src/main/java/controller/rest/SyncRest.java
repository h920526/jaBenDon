package controller.rest;

import model.SyncData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import service.SyncService;

@RestController
public class SyncRest {

	@Autowired
	private SyncService syncService;

	public SyncRest() {
		super();
	}

	/*
	 * custom service
	 */

	@RequestMapping(value = "/rest/sync/{utcTime}")
	public SyncData syncAll(@PathVariable long utcTime) {
		return syncService.syncAll(utcTime);
	}

}
