package service;

import model.SyncData;

public interface SyncService {

	/*
	 * custom service
	 */

	public SyncData syncAll(long oldSyncUTCTime);

}
