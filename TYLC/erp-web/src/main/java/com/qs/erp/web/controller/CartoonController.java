package com.qs.erp.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CartoonController {

    @RequestMapping(value = "Cartoon")
    public String index(){
        return "Cartoon/index";
    }
}
