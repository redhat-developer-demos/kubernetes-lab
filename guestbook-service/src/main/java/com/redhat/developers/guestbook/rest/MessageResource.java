/*
 * JBoss, Home of Professional Open Source
 * Copyright 2016, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.redhat.developers.guestbook.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.redhat.developers.guestbook.data.Message;
import com.redhat.developers.guestbook.data.MessageRepository;

@Path("/messages")
public class MessageResource {

	@Inject
	private MessageRepository messageRepository;

	@Inject
	private BadwordFilter badwordFilter;

	@POST
	public Response addMessage(@FormParam("username") String username, @FormParam("message") String text) {
		String input = badwordFilter.filterText(text);
		Message message = new Message(username, input);
		try {
			messageRepository.save(message);
		} catch (Exception e) {
			return Response.serverError().entity(e.getMessage()).build();
		}
		return Response.ok().build();
	}

	@GET
	@Produces("application/json")
	public List<Message> getAllMessages() {
		return messageRepository.findAllOrdered();
	}

}
