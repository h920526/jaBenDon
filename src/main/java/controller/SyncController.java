package controller;

import model.SyncData;

import org.springframework.web.bind.annotation.PathVariable;

public interface SyncController {

	/*
	 * custom service
	 */

	public SyncData syncAll(@PathVariable long utcTime);

}
