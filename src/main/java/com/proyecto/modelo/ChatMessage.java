package com.proyecto.modelo;

import com.proyecto.controlador.MessageType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessage {
    private String content;
    private String sender;
    private MessageType type;
    private String time;
    private String imagen;
    private Integer x;
    private Integer y;
    private Integer size;
    private String name;
    private String userImage;
    private String color;
}
