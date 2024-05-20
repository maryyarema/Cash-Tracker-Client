import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../models/AuthResponse";
import {API_URL} from "../http";
import React, {FC, useState} from "react";
export default class Store{

    user = {} as AuthResponse;
    isAuth = false;
    isLoading = false;
    constructor() {
      makeAutoObservable(this);
    }
  
    setAuth(bool: boolean) {
      this.isAuth = bool;
    }

    setUser(user: AuthResponse) {
      this.user = user;
    }
    setLoading(bool: boolean) {
      this.isLoading = bool;
    }

  
    async login(email: string, password: string) {
      try {
        const response = await AuthService.login(email, password);
        console.log(response);
        localStorage.setItem('token', response.data.token);
        this.setAuth(true);
        this.setUser(response.data);
      } catch (e: any) {
        console.log(e.response?.data?.message);
      }
    }
  
    async signup(email: string, password: string, name: string ) {
      try {
        const response = await AuthService.signup(email, password, name);
        console.log(response);
        localStorage.setItem('token', response.data.token);
        this.setAuth(true);
        this.setUser(response.data);
      } catch (e: any) {
        console.log(e.response?.data?.message);
      }
    }
    async logout() {
      try {
          const response = await AuthService.logout();
          localStorage.removeItem('token');
          this.setAuth(false);
          this.setUser({} as AuthResponse);
      } catch (e: any) {
          console.log(e.response?.data?.message);
      }
    }
    async checkAuth() {
      this.setLoading(true);
      try {
          const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
          console.log(response);
          localStorage.setItem('token', response.data.token);
          this.setAuth(true);
          this.setUser(response.data);
      } catch (e: any) {
          console.log(e.response?.data?.message);
      } finally {
          this.setLoading(false);
      }
  }

  }